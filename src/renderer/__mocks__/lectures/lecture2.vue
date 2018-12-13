<template functional>
    <div class="lecture2__wrapper">
        <Heading :level="1">SQL Injections</Heading>
        <SimpleText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
        </SimpleText>
        <Table :data="[{
                        date: '2016-05-03',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }, {
                        date: '2016-05-02',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }, {
                        date: '2016-05-04',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }, {
                        date: '2016-05-01',
                        name: 'Tom',
                        address: 'No. 189, Grove St, Los Angeles'
                    }]"/>
        <SimpleText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
        </SimpleText>
        <SimpleVideo src="../videos/bigBuckBunny.mp4"/>
        <SimpleText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
        </SimpleText>
        <AdvancedImage src="../images/dummy_400x400.png" description="Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat" height="25em"/>
        <Citation cite="The Security Considerations section addresses risks associated
        with name ambiguity" source="https://tools.ietf.org/html/rfc5280" />
        <Code language="javascript" :code="'const a = 1 + 2;'" />
        <YouTube url="https://www.youtube.com/watch?v=aqz-KE-bpKQ" />
    </div>
</template>
