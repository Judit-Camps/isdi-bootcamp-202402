// Change 'this' in a to your name starting from f1

var a = ['this']

var dict = {
    pos: 0,
    name: a,
    time: 10
}

var f2 = function () {
    return ['one', 'two', ['three', dict]]
}

var f1 = function () {
    return [[1, {
        first: function () {
            return f2()
        }
    }]]
}