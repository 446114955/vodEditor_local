

class ctrol extends main {
    constructor() {
        super();
        this.nowChooseBtn = null;
    }
    // 初始化监听事件
    initEvent() {
        // 点击按钮上传图片
        $('#upPic').on('click', this.openFile.bind(this));
        this.inputPic = document.getElementById('inputPic');
        this.inputPic.addEventListener('change', this.upPic.bind(this));
        // 清楚选中元素
        $('.stage_container').bind('mousedown', '.stage_container', this._cleanChoose.bind(this));
        $(document).bind('mouseup', '.stage_container', this._mouseUpEvent.bind(this));
        // 层级更换
        $("#layer_list").on("sortupdate", this.__proto__.__proto__.ctrolLayer.changeLayer.bind(this));

        // 左对齐按钮事件
        $("#left_align").bind("click", this.align.bind(this));
        // 居中对齐按钮事件
        $("#center_align").bind("click", this.align.bind(this));
        // 垂直居中按钮事件
        $("#vertical_align").bind("click", this.align.bind(this));
        // 右对齐按钮事件
        $("#right_align").bind("click", this.align.bind(this));
        // 输入框输入坐标
        $("#inputX").bind('input', this.setInput.bind(this));
        $("#inputY").bind('input', this.setInput.bind(this));
        // 输入id
        $('#inputId').bind('input', this.setInput.bind(this));
        // 选择类别
        $('#selectAlt').bind('change', this.setInput.bind(this));
        // 上传按钮选择效果
        $('#inputBtnL').bind('change', this.upBtnLight.bind(this));
        // 按钮向上选择ID输入
        $('#inputTop').bind('input', this.setInput.bind(this));
        $('#inputBottom').bind('input', this.setInput.bind(this));
        $('#inputLeft').bind('input', this.setInput.bind(this));
        $('#inputRight').bind('input', this.setInput.bind(this));
        // 选择按钮类型
        $('#btn_state').bind('change', this.setInput.bind(this));
        // 添加按钮是否免费
        $('#btn_free').bind('change', this.setInput.bind(this));
        // 添加视频
        $('#add_viedo').bind('click', this.addViedo.bind(this));
        // 选择分类事件触发
        if(this.__proto__.__proto__.speState=='vod2.0'){
            $('#select_type').bind('change', this.setInput.bind(this));
            $('#media_btn').bind('click', this.setInput.bind(this));
            $('#close_media').on('click', this.closeMedia.bind(this));
        }else{
            $('#media_input').bind('change', this.setInput.bind(this));
            $('#close_media').on('click', this.closeMedia2.bind(this));
            $('#media_btn2').bind('click', this.setInput.bind(this));
        }
        

        // 二级界面按钮
        $('#add_more').bind('click', this.addLink.bind(this));
        $('#close_more').bind('click', this.closeLink.bind(this));
        $('#more_btn').bind('click', this.setInput.bind(this));
        window.addEventListener('keyup', this.chooseBtn.bind(this));

        // 保存json数据
        $('#saveJson').bind('click',this.saveJson.bind(this));
        // 下载html
        $('#downloadHtml').bind('click',this.downloadHtml.bind(this));
        this.global = new global();
    }

    // 上传图片
    openFile() {
        $('#inputPic').click();
    }
    // 上传图片回调
    upPic(event) {
        let formData = new FormData();
        formData.append('file', $("#inputPic")[0].files[0]);
        this.getSpeId();
        console.log('formData:', this.speId);
        formData.append("id", this.speId);

        $.ajax({
            url: this.baseURL + "image/upload",
            data: formData,
            type: "POST",
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success: (data) => {
                event.target.value = '';
                this.inputPic = document.getElementById('inputPic');
                // 图片容器
                let picMan = new picManage();
                picMan.pushNewPic(data);
                this.createPic(picMan);
                // this.inputPic.removeEventListener('change', this.upPic.bind(this));
            },
            error: function (data) {

            }
        })
    }
    // 重新进入加载图片
    againInit(item){
        this.inputPic = document.getElementById('inputPic');
        // 图片容器
        let picMan = new picManage(item);
        picMan.pushOldPic();
        this.createPic(picMan);
    }
    // 上传选中按钮图片
    upBtnLight(evt) {


        let formData = new FormData();
        formData.append('file', $("#inputBtnL")[0].files[0]);
        let pic = this.__proto__.__proto__.ctrolPic;
        let dataId = pic.dataset['itemId'];
        console.log('dataId:', dataId);
        this.getSpeId();
        console.log('formData:', this.speId);
        formData.append("id", this.speId);
        formData.append("dataId", dataId);

        $.ajax({
            url: this.baseURL + "btn/upload",
            data: formData,
            type: "POST",
            processData: false,//用于对data参数进行序列化处理 这里必须false
            contentType: false, //必须
            success: (data) => {
                event.target.value = '';
                this.inputPic = document.getElementById('inputPic');
                console.log(data);
                this.setBtnL(data);
            },
            error: function (data) {

            }
        })
    }
    // 生成图片
    createPic(picMan) {
        this.__proto__.__proto__.maxNum++;
        let len = this.__proto__.__proto__.picArray.length;
        let imgItem = this.__proto__.__proto__.picArray[len - 1];
        let imgDom = document.createElement("img");
        imgDom.src = `${imgItem.imgSrc}`;
        let fg = document.createElement("div");
        fg.className = "fg image-fg";

        let idName = document.createElement("div");
        idName.className = "image_idName";
        if(imgItem.imgId!=null){
            idName.innerHTML = `ID:${imgItem.imgId?imgItem.imgId:''}`;
        }
        

        // 创建新的容器
        let con = new container();
        con.setPicId(len);
        con.addElement(imgDom);
        con.addElement(idName);
        con.addElement(fg);
        con.addStage();


        // 创建图层
        con.addList(imgItem);
        // 监听事件
        this.addEvent();
        // 图层监听事件
        this.__proto__.__proto__.ctrolLayer.init(imgItem);
        console.log(this.__proto__.__proto__.picArray);
    }
    // 初始化图片的位置
    setPicAlt(){
        let container = this.__proto__.__proto__.picArray;
        container.forEach((item,index)=>{
            $(item.stageDom).css({"left":`${item.imgX}px`,"top":`${item.imgY}px`});
        })
    }
    // 生成图片后事件监听
    addEvent() {
        let len = this.__proto__.__proto__.picArray.length - 1;
        let item = this.__proto__.__proto__.picArray[len].stageDom;
        // 现在图片
        $(item).bind('mousedown', this._onChooseItem.bind(this));
    }
    // 判断是否有选中元素
    isChoose() {
        if ((typeof this.__proto__.__proto__.ctrolPic == undefined) || (this.__proto__.__proto__.ctrolPic == null)) return true;
    }
    // 删除元素
    removeItem(index) {
        console.log(index);
        let stageDom = this.__proto__.__proto__.picArray[index].stageDom;
        let layerDom = this.__proto__.__proto__.picArray[index].layerDom
        let stageFather = stageDom.parentNode;
        let layerFather = layerDom.parentNode;
        stageFather.removeChild(stageDom);
        layerFather.removeChild(layerDom);
        this.__proto__.memorytCon.push(this.__proto__.__proto__.picArray);
        this.__proto__.__proto__.picArray.splice(index, 1);
        console.log(this.__proto__.__proto__.picArray);
    }
    // 显示元素
    showItem(index) {
        console.log(index);
        let stageDom = this.__proto__.__proto__.picArray[index].stageDom;
        let layerDom = this.__proto__.__proto__.picArray[index].layerDom;
        if (stageDom.style.visibility != 'hidden') {
            stageDom.style.visibility = 'hidden';
            $(stageDom).find('.image-fg').css('visibility', 'hidden');
            $(layerDom).addClass('un-visible-item');
            console.log($(layerDom).find('.delete_btn'));
            // $(layerDom).find('.delete_btn')[0].parentNode.style['pointer-events'] = 'auto';
        } else {
            stageDom.style.visibility = 'visible';
            $('.image-fg').css('visibility', 'hidden');
            $(stageDom).find('.image-fg').css('visibility', 'visible');
            $(layerDom).removeClass('un-visible-item');
            // $(layerDom).find('.delete_btn')[0].parentNode.style['pointer-events'] = 'none';
        }

    }
    // 在图片数组中查询相同id
    selectDataId(id) {
        let container = this.__proto__.__proto__.picArray;
        for (let i in container) {
            let stageId = container[i].stageDom.dataset['itemId'];
            if (id == stageId) {
                return i;
            }
        }
    }
    // 选中图片处理
    _onChooseItem(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.__proto__.__proto__.ctrolPic = evt.currentTarget;
        let pic = this.__proto__.__proto__.ctrolPic;
        // 设置图片选中效果
        this.addChooseClass();
        /* 获取需要拖动节点的坐标 */
        let offset_x = $(this)[0].ctrolPic.offsetLeft;
        let offset_y = $(this)[0].ctrolPic.offsetTop;
        /* 获取当前鼠标的坐标 */
        let mouse_x = event.pageX;
        let mouse_y = event.pageY;
        $(pic).css({
            top: `${offset_y}px`,
            left: `${offset_x}px`
        });
        $(document).bind('mousemove', (event) => {
            event.preventDefault();
            event.stopPropagation();
            let _x = event.pageX - mouse_x;
            let _y = event.pageY - mouse_y;
            /* 设置移动后的元素坐标 */
            let now_x = (offset_x + _x) + "px";
            let now_y = (offset_y + _y) + "px";
            console.log('now_x:', now_x);
            console.log('now_y:', now_y);
            /* 改变目标元素的位置 */
            $(pic).css({
                top: now_y,
                left: now_x
            });
        })
    }
    /* 当鼠标左键松开，接触事件绑定 */
    _mouseUpEvent(evt) {

        if (this.isChoose() || (this.isPic(evt.target))) return;
        console.log(evt.target);
        console.log($('.pic'));
        console.log(11111111111111111111111);
        let pic = this.__proto__.__proto__.ctrolPic;
        let container = this.__proto__.__proto__.picArray;
        let dataId = pic.dataset['itemId'];
        let idNum = this.selectDataId(dataId);
        let top = $(pic).css('top');
        let left = $(pic).css('left');
        top = top.replace(/px*/g, '');
        left = left.replace(/px*/g, '');
        container[idNum].imgX = left;
        container[idNum].imgY = top;
        console.log('_mouseUpEvent:', container);
        // this.changInputPoint(container[idNum].imgX,container[idNum].imgY);
        this.setAllInputAll(container[idNum]);
        $(document).unbind("mousemove");
    }
    // 判断是点击松开否触摸到图片
    isPic(pic) {
        for (let i in $('.image-fg')) {
            if ($('.image-fg')[i] == pic) {
                console.log(222222222222222222)
                return false;
            }
            if (i == $('.image-fg').length - 1) {
                return true;
            }
        }
    }
    //选中添加样式
    addChooseClass() {
        let pic = this.__proto__.__proto__.ctrolPic;
        console.log('this2:', pic);
        $('.image-fg').css('visibility', 'hidden');
        $(pic).find('.image-fg')[0].style.visibility = 'visible';
    }
    // 清楚图片选中
    _cleanChoose(evt) {
        if (this.isChoose() || (evt.target !== $('.stage_container')[0])) return;
        this.__proto__.__proto__.ctrolPic = null;
        $('.image-fg').css('visibility', 'hidden');
        this.changInputPoint('', '');
        $('#btn_attr').css('pointer-events', 'none');
        $('#btn_attr').css('visibility', 'hidden');
    }
    // 对齐逻辑
    align(evt) {
        if (this.isChoose()) return;
        let container = this.__proto__.__proto__.picArray;
        console.log('align:', container);
        let pic = this.__proto__.__proto__.ctrolPic;
        let dataId = pic.dataset['itemId'];
        let idNum = this.selectDataId(dataId);
        let width = $(pic).width();
        let height = $(pic).height();
        let stageWidth = 1280;
        let stageHeight = 720;
        let btn = evt.currentTarget;
        let left = 0;
        let top = 0;

        switch (btn.getAttribute('id')) {
            case 'left_align':
                left = 0;
                container[idNum].imgX = `${left}`;
                $(pic).css('left', `${left}px`);
                break;
            case 'center_align':
                left = stageWidth / 2 - width / 2;
                container[idNum].imgX = `${left}`;
                $(pic).css('left', `${left}px`);
                break;
            case 'vertical_align':
                left = stageWidth / 2 - width / 2;
                top = stageHeight / 2 - height / 2;
                container[idNum].imgX = `${left}`;
                container[idNum].imgY = `${top}`;
                $(pic).css({ 'left': `${left}px`, 'top': `${top}px` });
                break;
            case 'right_align':
                left = stageWidth - width;
                container[idNum].imgX = `${left}`;
                $(pic).css('left', `${left}px`);
                break;
        }
        // this.changInputPoint(container[idNum].imgX,container[idNum].imgY);
        this.setAllInputAll(container[idNum])
    }
    // 坐标输入栏赋值
    changInputPoint(x, y) {
        if (typeof x != undefined) $('#inputX').val(x);
        if (typeof y != undefined) $('#inputY').val(y);
    }
    // 重置所有输入框值
    setAllInputAll(item) {
        $('#inputX').val(item.imgX ? item.imgX : 0);
        $('#inputY').val(item.imgY ? item.imgY : 0);
        $('#inputId').val(item.imgId ? item.imgId : '');
        $('#inputAlpha').val(item.imgAlphe ? item.imgAlphe : '');
        $('#selectAlt').val(item.imgAlt);
        if (item.imgAlt == "图片") {
            $('#btn_attr').css('pointer-events', 'none');
            $('#btn_attr').css('visibility', 'hidden');
        } else {
            $('#btn_attr').css('pointer-events', 'auto');
            $('#btn_attr').css('visibility', 'visible');
        }
        $('#inputTop').val(item.imgTopId ? item.imgTopId : '');
        $('#inputBottom').val(item.imgBottomId ? item.imgBottomId : '');
        $('#inputLeft').val(item.imgLeftpId ? item.imgLeftpId : '');
        $('#inputRight').val(item.imgRightId ? item.imgRightId : '');
        $('#btn_state').val(item.imgStage);
        $('#btn_free').val(item.imgFree);
    }
    // 输入框输入坐标
    setInput(evt) {
        if (this.isChoose()) return;
        let inputItem = evt.currentTarget;
        let container = this.__proto__.__proto__.picArray;
        let pic = this.__proto__.__proto__.ctrolPic;
        let dataId = pic.dataset['itemId'];
        let idNum = this.selectDataId(dataId);

        $(inputItem).val();
        console.log($(inputItem).val())
        switch (inputItem.getAttribute('id')) {
            case 'inputX':
                let left = $(inputItem).val();
                container[idNum].imgX = `${left}`;
                $(pic).css('left', `${left}px`);
                // this.changInputPoint(left,container[idNum].imgY);
                break;
            case 'inputY':
                let top = $(inputItem).val();
                container[idNum].imgY = `${top}`;
                $(pic).css({ 'top': `${top}px` });
                // this.changInputPoint(container[idNum].imgX,top);
                break;
            case 'inputId':
                inputItem.value = inputItem.value.replace(/[^a-z0-9]/g, '');
                let id = $(inputItem).val();
                container[idNum].imgId = id;
                let idClass = $(pic).find('.image_idName');
                idClass.html(`ID:${ id? id:''}`);
                console.log(id);
                break;
            case 'inputAlpha':
                let alpha = $(inputItem).val();
                container[idNum].imgAlpha = alpha;
                break;
            case 'selectAlt':
                let alt = $(inputItem).val();
                container[idNum].imgAlt = alt;
                break;
            case 'inputTop':
                let topId = $(inputItem).val();
                container[idNum].imgTopId = topId;
                break;
            case 'inputBottom':
                let bottomId = $(inputItem).val();
                container[idNum].imgBottomId = bottomId;
                break;
            case 'inputLeft':
                let leftId = $(inputItem).val();
                container[idNum].imgLeftpId = leftId;
                break;
            case 'inputRight':
                let rightId = $(inputItem).val();
                container[idNum].imgRightId = rightId;
                break;
            case 'btn_state':
                let state = $(inputItem).val();
                container[idNum].imgStage = state;
                break;
            case 'btn_free':
                let free = $(inputItem).val();
                container[idNum].imgFree = free;
                break;
            case 'select_type':
                let selectValue = $(inputItem).val();
                console.log(selectValue)
                this.showSelectList(selectValue);
                break;
            case 'media_btn':
                let selectText = $('#media_input').val();
                this.showInputList(selectText);
                break;
            case 'media_btn2':
                let media = $('#media_input').val();
                container[idNum].btnVideo = media;
                $('#media_capital').css('visibility', 'hidden');
                break;
            case 'more_btn':
                let moreText = $('#more_input').val();
                container[idNum].btnMore = moreText;
                $('#more_lint').css('visibility', 'hidden');
                break;
        }
        this.setAllInputAll(container[idNum]);
        this.saveBtnArray();
    }
    // 保存所有按钮
    saveBtnArray() {
        this.__proto__.__proto__.btnArray = [];
        this.__proto__.__proto__.picArray.forEach((item, index) => {
            if (item.imgAlt == "按钮") {
                this.__proto__.__proto__.btnArray.push(item);
            }
        })
    }
    // 保存按钮选择图片回调数据
    setBtnL(data) {
        let imgLSrc = data.pathNow;
        let imgName = data.picName;
        imgLSrc = imgLSrc.split('public')[1];
        imgLSrc = `${imgLSrc}\\${imgName}`;
        let dataId = data.dataId;
        let idNum = this.selectDataId(dataId);
        let container = this.__proto__.__proto__.picArray;
        container[idNum].imgLSrc = imgLSrc;
        console.log(container[idNum])
    }
    addViedo(evt) {
        if(this.__proto__.__proto__.speState!='vod2.0'){
            $('#media_capital').css('visibility', 'visible');
        }else{
            $.ajax({
                url: "http://192.168.160.8:8080/ilearn/type/twolevel",
                type: "GET",
                dataType: "jsonp",
                data: '',
                jsonp: 'twolevel',
                // jsonpCallback:"callback",
                success: function (result) {
                    for (var i in result) {
                        alert(i + ":" + result[i]);//循环输出a:1,b:2,etc. 
                    }
                },
            })
        }

    }
    // 视频分类jsonp回调处理
    addViedoCb(data) {
        console.log('data:', data);
        let opition = '';
        data.forEach((item, index) => {
            opition += `<option value="${item.id}">${item.name}</option>`
        });
        $('#select_type').append(opition);
        $('#media_capital').css('visibility', 'visible');
    }
    showSelectList(id) {
        console.log(id)
        let urlSrc = "http://192.168.160.8:8080/ilearn/content/childType/" + id;
        $.ajax({
            url: urlSrc,
            type: "GET",
            dataType: "jsonp",
            data: '',
            jsonp: 'childType',
            // jsonpCallback:"callback",
            success: function (result) {
                for (var i in result) {
                    alert(i + ":" + result[i]);//循环输出a:1,b:2,etc. 
                }
            },
        })
    }
    // 模糊查找
    showInputList(name) {
        let newName = encodeURI(name);
        // newName = encodeURI(newName);
        let urlSrc = "http://192.168.160.8:8080/ilearn/content/query/name/" + newName;
        console.log(urlSrc);
        $.ajax({
            url: urlSrc,
            type: "GET",
            dataType: "jsonp",
            data: '',
            jsonp: 'name',
            // jsonpCallback:"callback",
            success: function (result) {
                for (var i in result) {
                    alert(i + ":" + result[i]);//循环输出a:1,b:2,etc. 
                }
            },
        })
    }
    // 生成列表
    createList(data) {
        $('#manage_list').empty();
        let trCon = '';
        data.forEach((item, index) => {
            trCon += `
            <tr class="even pointer column-title">
                <td class="td_id ">${item.id}</td>
                <td class="td_name ">${item.name}</td>
                <td class="td_state">
                    <a class="btn btn-info btn-xs" onClick="chooseVideo(${item.id})">
                    <span class="glyphicon glyphicon-ok"aria-hidden="true" data-item-id="${item.id}" ></span>
                    </a>
                </td>
            </tr>`;
        });
        $('#manage_list').append(trCon);

    }
    // 保存视频选项
    saveVideo(id){
        let container = this.__proto__.__proto__.picArray;
        let pic = this.__proto__.__proto__.ctrolPic;
        let dataId = pic.dataset['itemId'];
        let idNum = this.selectDataId(dataId);
        container[idNum].btnVideo = id;
        this.closeMedia();
    }
    // 关闭媒资界面
    closeMedia() {
        $('#media_capital').css('visibility', 'hidden');
        $('#manage_list').empty();
    }
    // 关闭媒资界面
    closeMedia2() {
        $('#media_capital').css('visibility', 'hidden');
        $('#media_input').val('');
    }
    // 打开输入链接
    addLink() {
        $('#more_lint').css('visibility', 'visible');
    }
    closeLink() {
        $('#more_lint').css('visibility', 'hidden');
    }

    // 选择按钮
    chooseBtn(evt) {
        // 上38，左37，右39，下40
        let keyCode = evt.keyCode;
        if ((keyCode != 38) && (keyCode != 37) && (keyCode != 39) && (keyCode != 40)) return;
        this.chooseBtnSrc(keyCode);
    }
    // 返回按钮行数
    selecIndexBtn(num) {
        let len = this.__proto__.__proto__.btnArray.length;
        for (let i = 0; i < len; i++) {
            if (this.__proto__.__proto__.btnArray[i].imgId == num) {
                return i;
            }
        }
        return false;
    }
    // 向上选择按钮
    chooseBtnSrc(keyCode) {
        if(this.__proto__.__proto__.btnArray.length<1)return;
        this.nowChooseBtn = this.nowChooseBtn || this.__proto__.__proto__.btnArray[0].imgId;
        if (this.nowChooseBtn == null) return;
        let nextBtnId = null;

        let nowBtnIndex = this.selecIndexBtn(this.nowChooseBtn);
        switch (keyCode) {
            case 38:
                nextBtnId = this.__proto__.__proto__.btnArray[nowBtnIndex].imgTopId;
                break;
            case 37:
                nextBtnId = this.__proto__.__proto__.btnArray[nowBtnIndex].imgLeftpId;
                break;
            case 39:
                nextBtnId = this.__proto__.__proto__.btnArray[nowBtnIndex].imgRightId;
                break;
            case 40:
                nextBtnId = this.__proto__.__proto__.btnArray[nowBtnIndex].imgBottomId;
                break;
        }
        let nextBtnIndex = this.selecIndexBtn(nextBtnId);
        if (nextBtnIndex==null) return;
        let btnItem = this.__proto__.__proto__.btnArray[nextBtnIndex];
        let btnDom = btnItem.stageDom;
        let btnPic = btnDom.getElementsByTagName("img");

        let nowBaseSrc = btnItem.imgSrc;
        nowBaseSrc = nowBaseSrc.substring(1,nowBaseSrc.length);
        nowBaseSrc = nowBaseSrc.replace(/\\/g,"\/");
        let nowImgSrc = this.global.devURL+nowBaseSrc;
        this.clearChooseBtn();
        if (btnPic[0].src == nowImgSrc) {
            nowBaseSrc = btnItem.imgLSrc.substring(1,btnItem.imgLSrc.length);
            nowBaseSrc = nowBaseSrc.replace(/\\/g,"\/");
            btnPic[0].src = this.global.devURL+nowBaseSrc;
        } else {
            btnPic[0].src = nowImgSrc;
        }
        this.nowChooseBtn = nextBtnId;

    }
    // 清楚选中效果
    clearChooseBtn(){
        let btnArray = this.__proto__.__proto__.btnArray;
        btnArray.forEach((item,index)=>{
            let btnPic = item.stageDom.getElementsByTagName("img");
            btnPic[0].src = item.imgSrc;
        })
    }

    // 保存json数据
    saveJson(evt){
        // let formDatas = [];
        // this.getSpeId();
        let formData = {};
        formData['pic'] = this.__proto__.__proto__.picArray;
        formData['state'] = this.__proto__.__proto__.speState;
        formData['id'] = this.__proto__.__proto__.speId;
        formData = JSON.stringify(formData);
        console.log(formData)
        $.ajax({
            url: this.baseURL + "save/json",
            type: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: formData,
            success: (data) => {
                // let newdata = JSON.parse(data);
                console.log(data);
            },
            error: function (data) {

            }
        })
        // console.log(formDatas);
    }

    // 下载html
    downloadHtml(evt){
        let id = this.__proto__.__proto__.speId;
        $.ajax({
            url: this.baseURL + "download/file",
            type: "GET",
            data: `id=${id}`,
            success: (data) => {
                // let newdata = JSON.parse(data);
                console.log(data);
                if(data.code=='200'){
                    let downloadDom = document.getElementById('downloadFile');

                    var url = `http://localhost:4000/${data.url}/${data.name}`;
                    downloadDom.href = url;
                    downloadDom.download = `${data.name}`;
                    downloadDom.click();
                
                }
            },
            error: function (data) {

            }
        })
    }
}
// jsonp回调数据回调
function twolevel(data) {
    ctrolLogic.addViedoCb(data);
}
function childType(data) {
    console.log(data);
    ctrolLogic.createList(data);
}
function name(data) {
    console.log(data);
    ctrolLogic.createList(data);
}
// 选择视频按钮
function chooseVideo(id) {
    console.log(id);
    ctrolLogic.saveVideo(id);
}