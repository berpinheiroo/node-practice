export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Fulana",
        email: "fulana@dio.com"
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ) {
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log('DB atualizado', this.db)
    }
    getAllUsers = () => {
        return this.db
    }
    deleteUser = (name: string) => {
        const userIndex = this.db.findIndex(user => user.name === name)
        if (userIndex !== -1) {
            this.db.splice(userIndex, 1)
            console.log('DB atualizado', this.db)
        } else {
            console.log('Usuário não encontrado')
        }
    }
}