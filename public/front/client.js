const DIR_URL = "//localhost:8081/dir";
const vm = new Vue({
    el: '#app',
    data: {
        result: 'result: empty',
        dirName: '/',
    },
    methods: {
        viewDir: function() {
            axios.get(DIR_URL + this.dirName).then(response => {
                this.result = response.data;
            });
        },
        createDir: function() {
            axios.post(DIR_URL + this.dirName).then(response => {
                this.result = response.data;
            });
        },
        deleteDir: function() {
            axios.delete(DIR_URL + this.dirName).then(response => {
                this.result = response.data;
            });
        }
    }
});