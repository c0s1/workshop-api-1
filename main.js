var app = new Vue({
    el: "#app",
    data: {
        arrayData: [],
        users: [],
        username: "",
        password: "",
        photo: "",
        watch: 0
    },
    methods: {
        async listUsers() {
            url = "https://randomuser.me/api/?results=10";
            await fetch(url)
                .then((response) => response.json())
                .then((data) => this.arrayData = data);

                this.users = this.arrayData.results.map((element) => {
                    return {
                        ...element,
                    };
                });
                
                this.updateLocalStorage();
        },
        login(){
            if(this.username == "" && this.password) {
                alert("Campos vacíos");
            }
            this.users.forEach((element) => {
                // console.log(`${element['login']['password']}`)
                if (element.login.username == this.username  && element.login.password == this.password) {
                    console.log("Hola");
                    this.photo = element.picture.large;
                    this.updateLocalStorage();
                    this.watch = 0
                } 
              });
        },
        updateLocalStorage(){
            localStorage.setItem('users', JSON.stringify(this.users));
        },
    },
    mounted() {
        this.listUsers();
    },
    computed: {},
});