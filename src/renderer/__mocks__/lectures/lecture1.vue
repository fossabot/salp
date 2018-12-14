<template functional>
    <div class="lecture1__wrapper">
        <Heading :level="1">Database Management Systems</Heading>
        <SimpleText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat officiis cupiditate ducimus explicabo temporibus
            exercitationem ipsum blanditiis recusandae.
        </SimpleText>
        <Code :language="'javascript'" :code="'const a = 1 + 2;\nconst b = 2  / 3 (9 - 1 * 2);\nconst c = a + b;'" />
        <SimpleLink url="http://www.github.com" />
        <SimpleText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat
        </SimpleText>
        <Code :language="'text/x-sql'" :code="'SELECT * FROM USERS WHERE USERS.ID > 1;'" />
        <SimpleImage src="../images/dummy_400x400.jpg" />
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
        <AppPreview src="../images/dummy_400x400.jpg" height="12em" heading="WireShark" description="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Doloremque pariatur quo ut dolorem? Numquam, in veniam nobis veritatis,
            fugiat vitae quaerat officiis cupiditate ducimus explicabo temporibus
            exercitationem ipsum blanditiis recusandae." url="http://www.github.com" />
    </div>
</template>
