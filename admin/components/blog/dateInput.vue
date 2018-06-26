<template lang='pug'>
    input(type="date" ref="input" placeholder="Дата" 
        :value="value"
        :readonly="readonly" 
        @input="updateValue($event.target.value)"
        @blur="formatValue")
</template>
<script>
const moment = require('moment');
export default {
    props: {
        value: {
            type: String,
            default: moment().format(),
        },
        readonly: {
            type: Boolean
        }
    },
    mounted() {
        this.formatValue();
    },
    methods: {
        updateValue: function (value) {
            var result = moment(value).format('YYYY-MM-DD');
            this.$emit('input', result)
        },
        formatValue: function () {
            this.$refs.input.value =  moment(this.value).format('YYYY-MM-DD');
        },
    }
}
</script>
<style lang='scss'  scoped>
</style>