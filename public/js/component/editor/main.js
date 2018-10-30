var ctrolLogic = null;
class main {
    constructor() {
        this.baseURL = 'http://localhost:4000/';
        this.userName = null;
    }

    init(data) {
       
         //图片最大数量
         this.__proto__.maxNum = 0;
         // id
         this.__proto__.speId = null;
         this.__proto__.speState = null;
         // 全部图片
         this.__proto__.picArray = [];
         this.__proto__.btnArray = [];
         // 正在操作图片
         this.__proto__.ctrolPic = null;
         // 向后操作池
         this.__proto__.memorytCon = [];
         // 编辑逻辑
         this.__proto__.ctrolLogic = new ctrol();
         ctrolLogic = this.__proto__.ctrolLogic
         this.getSpeId();
         // 更具运营商的不同来进行媒资选择
         this.showSate();

         // 层级更换逻辑
         this.__proto__.ctrolLayer = new layerCtrol();

         let logicItem = new logic();

         this.__proto__.ctrolLogic.initEvent();
         logicItem.init();

         // 拖动图层
         $("#layer_list").sortable({
             axis: "y",
             distance: 50
         });
        if (data) {
            let container = data.pic;
            container.forEach((item,index) => {
                ctrolLogic.againInit(item);
                ctrolLogic.setPicAlt();
                ctrolLogic.saveBtnArray();
            });
        }
        

    }
    // 更具运营商的不同来进行媒资选择
    showSate(){
        let dom = null;
        if(this.__proto__.speState=='vod2.0'){
            dom = `<!-- 头部标题 -->
            <div class="media_title">
                <div class=" nav toggle">
                    <label>选择视频资源：</label>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li id="close_media">
                        <a style="color:#5A738E"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                    </li>
                </ul>
            </div>
            <div class="media_container">
                <div class="select_name top_search ">
                    <div class="input-group">
                        <input id="media_input" type="text" class="form-control" placeholder="Searchfor..">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" id="media_btn">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">搜索</font>
                                </font>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="select_type">
                    <div class="form-group">
                        <label class="control-label col-md-1 col-sm-1 col-xs-12">
                            <font style="vertical-align: inherit;font-size: 16px">
                                <font style="vertical-align: inherit;">分类选择:</font>
                            </font>
                        </label>
                        <div class="col-md-11 col-sm-11 col-xs-12">
                            <select id="select_type" class="select2_single form-control">
                                <!-- <option value=""></option> -->
                            </select>
                        </div>
                    </div>
                </div>
                <div class="select_container">
                    <table class="table table-striped jambo_table bulk_action">
                        <!-- 专题列表表头 -->
                        <thead>
                            <tr class="heading">
                                <th class="column-title">视频ID</th>
                                <th class="column-title">视频名称</th>
                                <th class="column-title">操作</th>
                            </tr>
                        </thead>
                        <!-- 专题列表内容 -->
                        <tbody id="manage_list">
                        </tbody>
                    </table>
                </div>
            </div>`;
        }else{
            dom = `
            <div class="more_title">
                    <div class=" nav toggle">
                        <label>添加链接：</label>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li id="close_media">
                            <a style="color:#5A738E"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
                        </li>
                    </ul>
                </div>
                <div class="more_container">
                    <div class="select_name top_search ">
                        <div class="input-group">
                            <input id="media_input" type="text" class="form-control" placeholder="Searchfor..">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button" id="media_btn2">
                                    <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">确定</font>
                                    </font>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>`
        }
        $('.media_wapper').append(dom);
    }
    // 获取id
    getSpeId() {
        this.__proto__.speId = this.getQueryString('id');
        this.__proto__.speState = this.getQueryString('state');
    }
    // 正则获取url参数
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    // 获取itemId
    getItemId(dom) {
        if (!dom) return;
        let itemId = dom.dataset['itemId'];
        return itemId
    }
}