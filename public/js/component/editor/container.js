class container extends main{
    constructor(){
        super();
        // 编辑区域dom
        this._htmlElement = document.createElement("div");
        this._htmlElement.style.position = "absolute";
        this._htmlElement.style.width = "auto";
        this._htmlElement.style.height = "auto";
        this._htmlElement.tabIndex = -1;
        $(this._htmlElement).addClass('pic')
    }
    // 加入dom
    addElement(childDom){
        console.log(childDom)
        this._htmlElement.append(childDom);
    }
    // 添加舞台
    addStage(){
        let len = this.__proto__.__proto__.picArray.length;
        this.__proto__.__proto__.picArray[len-1].stageDom = this._htmlElement;
        $('#stage').append(this._htmlElement)
    }
    setPicId(len){
        this._htmlElement.style.zIndex = len;
        this._htmlElement.setAttribute("data-item-id",`item-${this.__proto__.__proto__.maxNum}`); 
    }

    // 添加图层按钮
    addList(imgItem){
        let len = this.__proto__.__proto__.picArray.length;
        let imgSrc = imgItem.imgSrc.replace(/\\/g,'/');
        let li = document.createElement("li");
        $(li).addClass('layer_li');
        // 加入data-item-id后data-前缀就被称为data属性 详情Dataset基础，data后的-会自动驼峰
        $(li).attr(`data-item-id`,`item-${this.__proto__.__proto__.maxNum}`);
        let addDom = `
        <div class="list_img" style="background-image: url(${imgSrc})">
            </div>
            <div class="list_ctrol">
                <a>
                    <div class="show_btn glyphicon glyphicon-eye-open"></div>
                </a>


                <a>
                    <div class="delete_btn glyphicon glyphicon-trash"></div>
                </a>
        </div>`;
        li.innerHTML = addDom;
        
        this.__proto__.__proto__.picArray[len-1].layerDom = li;
        // 添加隐藏事件
        $(li).find('.show_btn').on('click',this._onClickShowPic.bind(this));
        // 添加隐藏事件
        $(li).find('.delete_btn').on('click',this._onClickDeletPic.bind(this));
        $('#layer_list').prepend(li); 
        
    }
    // 隐藏图片事件
    _onClickShowPic(evt){
        this._selectDom(evt,'show');
    }
    // 删除键事件
    _onClickDeletPic(evt){
        this._selectDom(evt,'delete');
    }
    // 图层选择图片
    _selectDom(evt,deal){
        evt.preventDefault();
        evt.stopPropagation();
        let btn = evt.currentTarget;
        let objItem = btn.parentNode.parentNode.parentNode;
        if(!deal) return;
        // 不可访问样式
        if(deal=='delete'){
            if($(objItem).hasClass('un-visible-item')) return;
        }
        
        // 获取id
        let itemId = this.getItemId(objItem);
        if(typeof itemId == undefined) return;
        let container = this.__proto__.__proto__.picArray;
        console.log('container:',container);
        for(let i in container){
            let stageId = container[i].stageDom.dataset['itemId'];
            if(itemId==stageId){
                if(deal=='delete'){
                    this.__proto__.__proto__.ctrolLogic.removeItem(i);
                }else{
                    this.__proto__.__proto__.ctrolLogic.showItem(i);
                }               
            }
        }
    }
}