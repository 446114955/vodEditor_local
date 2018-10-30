// 初始化列表数据
function initList(){
    let base = new global();
    let baseURL = base.baseURL;
    $.ajax({
        url: baseURL+"spe/list",
        type: "GET",
        success: function (data) {
            console.log('data:',data);
            createList(data.list);
            addListenBtn()
        },
        error: function (error) {
            console.log('error:',error);
        }
    })
}
initList();
function createList(data){
    console.log(data)
    let html = '';
    data.forEach((item,index) => {
        html += `<tr class="even pointer column-title">
            <td class="td_id ">${item.Id}</td>
            <td class="td_num">${item.spenumber}</td>
            <td class="td_name">${item.spename}</td>
            <td class="td_pic">
                <img src="${item.spepic}" alt="">
            </td>
            <td class="td_state">${item.spestate}</td>
            <td class="td_src">${item.spesrc}</td>
            <td class="td_state">
                <a href="#" class="btn btn-info btn-xs editor_btn" name="${item.Id}"><span class="glyphicon glyphicon-pencil"
                    aria-hidden="true" ></span></a>
                <a href="#" class="btn btn-danger btn-xs" name="${item.Id}"><span class="glyphicon glyphicon-trash"
                    aria-hidden="true" ></span></a>
            </td>
        </tr>`
    });
    
    $('#manage_list').append(html);
}
// 监听按钮点击
function addListenBtn(){
    $(".editor_btn").on("click",function(evt){
        let base = new global();
        let baseURL = base.baseURL;
        $.ajax({
            url: baseURL+"choose/special",
            data:  `id=${this.name}`,
            type: "GET",
            success:function(data){
                console.log("data:",data);
                //执行之后的代码
                let id = data.id;
                let state = data.data[0].spestate
                window.location.href = `${base.devURL}editor?id=${id}&state=${state}`;
            }
        })
       
    });
}
