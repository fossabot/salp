# Behavior
Heartbleed is caused by wrong implementation of the Heartbet-Extension [RFC6520](https://tools.ietf.org/html/rfc6520) of OpenSSL.  
XKCD did a comic showing the behavior of Heartbleed.  
![XKCD Heartbleed](https://imgs.xkcd.com/comics/heartbleed_explanation.png)  

The Bug can be found inside [OpenSSL 1.0.1](https://github.com/openssl/openssl/blob/4817504d069b4c5082161b02a22116ad75f822b1/ssl/t1_lib.c).  
```text/x-csrc{33}
tls1_process_heartbeat(SSL *s)
	{
	unsigned char *p = &s->s3->rrec.data[0], *pl;
	unsigned short hbtype;
	unsigned int payload;
	unsigned int padding = 16; /* Use minimum padding */

	/* Read type and payload length first */
	hbtype = *p++;
	n2s(p, payload);
	pl = p;

	if (s->msg_callback)
		s->msg_callback(0, s->version, TLS1_RT_HEARTBEAT,
			&s->s3->rrec.data[0], s->s3->rrec.length,
			s, s->msg_callback_arg);

	if (hbtype == TLS1_HB_REQUEST)
		{
		unsigned char *buffer, *bp;
		int r;

		/* Allocate memory for the response, size is 1 bytes
		 * message type, plus 2 bytes payload length, plus
		 * payload, plus padding
		 */
		buffer = OPENSSL_malloc(1 + 2 + payload + padding);
		bp = buffer;
		
		/* Enter response type, length and copy payload */
		*bp++ = TLS1_HB_RESPONSE;
		s2n(payload, bp);
		memcpy(bp, pl, payload);
		
		r = ssl3_write_bytes(s, TLS1_RT_HEARTBEAT, buffer, 3 + payload + padding);

		if (r >= 0 && s->msg_callback)
			s->msg_callback(1, s->version, TLS1_RT_HEARTBEAT,
				buffer, 3 + payload + padding,
				s, s->msg_callback_arg);

		OPENSSL_free(buffer);

		if (r < 0)
			return r;
		}
	else if (hbtype == TLS1_HB_RESPONSE)
		{
		unsigned int seq;
		
		/* We only send sequence numbers (2 bytes unsigned int),
		 * and 16 random bytes, so we just try to read the
		 * sequence number */
		n2s(pl, seq);
		
		if (payload == 18 && seq == s->tlsext_hb_seq)
			{
			s->tlsext_hb_seq++;
			s->tlsext_hb_pending = 0;
			}
		}

	return 0;
}
```  
No traces are left if a server was exploited using Heartbleed.  

## Fix
Heartbleed was fixed with [OpenSSL 1.0.1g](https://github.com/openssl/openssl/blob/731f431497f463f3a2a97236fe0187b11c44aead/ssl/t1_lib.c).
```text/x-csrc{13-20}
tls1_process_heartbeat(SSL *s)
	{
	unsigned char *p = &s->s3->rrec.data[0], *pl;
	unsigned short hbtype;
	unsigned int payload;
	unsigned int padding = 16; /* Use minimum padding */

	if (s->msg_callback)
		s->msg_callback(0, s->version, TLS1_RT_HEARTBEAT,
			&s->s3->rrec.data[0], s->s3->rrec.length,
			s, s->msg_callback_arg);

	/* Read type and payload length first */
	if (1 + 2 + 16 > s->s3->rrec.length)
		return 0; /* silently discard */
	hbtype = *p++;
	n2s(p, payload);
	if (1 + 2 + payload + 16 > s->s3->rrec.length)
		return 0; /* silently discard per RFC 6520 sec. 4 */
	pl = p;

	if (hbtype == TLS1_HB_REQUEST)
		{
		unsigned char *buffer, *bp;
		int r;

		/* Allocate memory for the response, size is 1 bytes
		 * message type, plus 2 bytes payload length, plus
		 * payload, plus padding
		 */
		buffer = OPENSSL_malloc(1 + 2 + payload + padding);
		bp = buffer;
		
		/* Enter response type, length and copy payload */
		*bp++ = TLS1_HB_RESPONSE;
		s2n(payload, bp);
		memcpy(bp, pl, payload);
		bp += payload;
		/* Random padding */
		RAND_pseudo_bytes(bp, padding);

		r = ssl3_write_bytes(s, TLS1_RT_HEARTBEAT, buffer, 3 + payload + padding);

		if (r >= 0 && s->msg_callback)
			s->msg_callback(1, s->version, TLS1_RT_HEARTBEAT,
				buffer, 3 + payload + padding,
				s, s->msg_callback_arg);

		OPENSSL_free(buffer);

		if (r < 0)
			return r;
		}
	else if (hbtype == TLS1_HB_RESPONSE)
		{
		unsigned int seq;
		
		/* We only send sequence numbers (2 bytes unsigned int),
		 * and 16 random bytes, so we just try to read the
		 * sequence number */
		n2s(pl, seq);
		
		if (payload == 18 && seq == s->tlsext_hb_seq)
			{
			s->tlsext_hb_seq++;
			s->tlsext_hb_pending = 0;
			}
		}

	return 0;
}
```
