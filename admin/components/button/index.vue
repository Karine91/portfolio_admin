<template lang='pug'>
    button.button(
        type="type"
        :for="forName ? forName : ''"    
        ) {{name}}
</template>
<script>
export default {
    props: {
        name: String,
        type: {
            type: String,
            default: 'button'
        },
        forName: String
    }
}
</script>