class layerCtrol extends main{
    constructor(){
        super();
    }
    init(con){
        this.item = con;
        let layer = con.layerDom;
        
        $(layer).bind('click',this._onChooseItem.bind(this));

    }
    // 选中图片处理
    _onChooseItem(evt){
        evt.preventDefault();
        // evt.stopPropagation();
        // 触发图片点击效果进行关联,获取id
        let pic = evt.currentTarget;
        let objItem = pic;
        let itemId = this.getItemId(objItem);
        if(typeof itemId == undefined) return;
        let index = this.__proto__.__proto__.ctrolLogic.selectDataId(itemId);
        // 设置当前选中元素
        this.__proto__.__proto__.ctrolPic = this.__proto__.__proto__.picArray[index].stageDom;
        // 输入框赋值
        this.__proto__.__proto__.ctrolLogic.setAllInputAll(this.__proto__.__proto__.picArray[index]);
        // this.__proto__.__proto__.ctrolLogic.changInputPoint(this.__proto__.__proto__.picArray[index].imgX,this.__proto__.__proto__.picArray[index].imgY);
        this.__proto__.__proto__.ctrolLogic.addChooseClass();
    }
    // 层级更换
    changeLayer(evt){
        console.log(evt);
        let ids = [];
        $("#layer_list>li").each(function(){
            ids.push(this.dataset['itemId']);
        });
        console.log(ids);
        let container = this.__proto__.__proto__.picArray;
        let newArray = [];
        //
        ids.forEach((id,index) => {
            let found = false;
            container = container.filter((item)=>{
                let stageId = item.stageDom.dataset['itemId'];
                if(!found&&id==stageId){
                    newArray.push(item);
                    found = true;
                    return false;
                }else{
                    return true;
                }
            })
        });
        newArray.reverse()
        newArray.forEach((item,index)=>{
            item.stageDom.style.zIndex = index;
        })
        this.__proto__.__proto__.picArray = newArray;
        this.__proto__.__proto__.ctrolLogic.saveBtnArray();
        console.log('picArray:',this.__proto__.__proto__.picArray);
        // for(let i in container){
        //     let stageId = container[i].stageDom.dataset['itemId'];
        //     if(itemId==stageId){
        //         if(deal=='delete'){
        //             this.__proto__.__proto__.ctrolLogic.removeItem(i);
        //         }else{
        //             this.__proto__.__proto__.ctrolLogic.showItem(i);
        //         }               
        //     }
        // }
    }
}