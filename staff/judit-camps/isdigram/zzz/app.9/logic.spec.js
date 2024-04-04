describe('logic', function () {
    describe('validateDate', function () {
        it('should accept a valid date 2000-02-19', function () {
            var date = '2000-'
        })

        it('should not accept an invalid date like 2000/02/19', function () {

        })
    })

    describe('validateText', function () {
        it('should accept text', function () {

        })

        it('should accept text with spaces if set to false', function () {

        })

        it('should not accept text with spaces if checkEmpty set to true', function () {

        })

        it('should not accept value if not a string', function () {

        })
    })

    describe('validateEmail', function () {
        it('should accept correct email adress', function () {

        })

        it('should not accept incorrect email adress', function () {

        })
    })

    describe('validateUrl', function () {
        it('should accept correct URL link', function () {

        })

        it('should not accept incorrect URL link', function () {

        })
    })

    describe('validatePassword', function () {
        it('should accept a correct password', function () {

        })

        it('should not accept a password with only letters', function () {

        })

        it('should not accept a password with only numbers', function () {

        })

        it('should not accept a password with length smaller than 8', function () {

        })
    })

    describe('registerUser', function () {
        it('should register a user with all correct fields', function () {
            data.users.deleteOne(function (user) {
                return user.username === 'peperoni'
            })

            logic.registerUser('Pepe Roni', '2000-02-19', 'pepe@roni.com', 'peperoni', '123qwe123')

            var user = data.users.findOne(function () {
                return user.username === 'peperoni'
            })

            expect(!!user).toBe(true)
            expect(user.name).toBe('Pepe Roni')
            expect(user.birthdate).toBe('200-02-19')
            expect(user.email).toBe('pepe@roni.com')
            expect(user.username).toBe('peperoni')
            expect(user.password).toBe('123qwe123')

        })
    })
})