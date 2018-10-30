
$('#create_btn').click(function(){
    let formData = new FormData();
    formData.append('file',$("#spe_pic")[0].files[0]);
    let speName = $("#spe_name").val();
    let speNum = $("#spe_num").val();
    let speState = $("#spe_state").val();
    formData.append("spename",speName);
    formData.append("spenumber",speNum);
    formData.append("spestate",speState);
    let base = new global();
    let baseURL = base.baseURL;
    $.ajax({
        url: baseURL+"spe/creat",
        data:  formData,
        type: "POST",
        processData: false,//用于对data参数进行序列化处理 这里必须false
        contentType: false, //必须
        success: function (data) {
            console.log(data)
            console.log("success")

            if(data.code == 500){
                console.log(data.msg)
                console.info("error");
                $('#file_sqlRes').html("<span>"+data.msg+"</span>")
            }else{
                var taskId = data.taskId
                $('#file_sqlRes').html("<span>TaskId为："+taskId+"</span>")
                let id = data.id;
                let state = data.data[0].spestate
                let base = new global();
                window.location.href = `${base.devURL}editor?id=${id}&spestate=${state}`;
            }

        },
        error: function (data) {

        }
    })
})