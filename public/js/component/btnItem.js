class BtnContent extends stage{
    constructor(num) {
        super();
        this.data = {
            obj: {
                a: 1
            }
            // layer:1
        }   
        this.tlayer = num;
        this.layer = num;
        // this.changgeLayer = this.changgeLayer.bind(this);
    }
    created () {
        console.log(this.obj);
    }
    changgeLayer(item,value){
        Object.defineProperty(this, 'tlayer', {
            set: function (value) {
            
                item.layer = value;
                this.layer = item.layer;
                console.log('按钮:' + this.layer);
            },
            get: function () {
                return item.layer
            }
        })
    }
}