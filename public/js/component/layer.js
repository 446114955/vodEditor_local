class layer extends BtnContent{
    constructor(num) {
        super();
        // this.position = 'absolute';
        this.tlayer = num;
        this.layer = num; 
    }

    created () {
        console.log(this.obj);
    }
    // Object.defineProperty第一个参数为改变的对象，第二个参数为对象的属性名，第三个参数为拦截的处理方式，在这里调用了属性的set和get方法进行重新的赋值绑定操作
    changgeLayer(item,value){
        Object.defineProperty(this, 'tlayer', {
            set: function (value) {
            
                item.layer = value;
                this.layer = item.layer;
                console.log('层级:' + this.layer);
            },
            get: function () {
                
                return item.layer
            }
        })
    }

}