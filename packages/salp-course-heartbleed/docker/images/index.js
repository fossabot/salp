module.exports = {
    'metasploit': {
        image: 'metasploitframework/metasploit-framework:latest'
    },
    'httpd': {
        image: 'kacperzuk/heartbleed-testbed-nginx-bleed:latest',
        ports: ['443']
    },
    'user': {
        image: 'kacperzuk/heartbleed-testbed-http-bystander:latest'
    }
}
