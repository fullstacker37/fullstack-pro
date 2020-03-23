var Factory = function (type, content) {
    if (this instanceof Factory) {
        return this[type](content);
    } else {
        return new Factory(type, content);
    }
}

Factory.prototype = {
    yuwen: function (content) {
        console.log(content);
    },
    shuxue: function(content) {
        console.log(content);
    },
    english: function(content) {
        console.log(content);
    }
}

var data = [
    {
        type: 'yuwen',
        content: '我是语文老师!'
    },
    {
        type: 'shuxue',
        content: '我是数学老师!'
    },
    {
        type: 'english',
        content: '我是英语老师!'
    }
];

for (var i = 0; i < data.length; i++) {
    Factory(data[i].type, data[i].content);
}