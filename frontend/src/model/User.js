export class User {
    constructor(username, password, name, email,gender, role,id,file){
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.id = id;
        this.role=role;
        this.gender=gender;
        this.file = file;
    }
}