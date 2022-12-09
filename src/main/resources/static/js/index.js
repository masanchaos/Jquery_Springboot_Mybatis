//顯示列表首頁
$(function () {
    getList()
    //雙擊修改用户
    $("tbody").on("dblclick", "td", function () {
        //拿到雙擊的td的值
        var oldVal = $(this).html();
        var input = "<input type='text' id='tempId' value='" + oldVal + "'>";
        //拿到所有td的集合
        var siblings = $(this).parent().children()
        //拿id值
        var id= siblings[0].innerText
        //拿name值
        var name= siblings[1].innerText
        //拿中文成績
        var chineseScore= siblings[2].innerText
        //拿數學成績
        var mathScore= siblings[3].innerText
        //拿英文成績
        var englishScore= siblings[4].innerText
        //點擊處置空
        $(this).text('');
        //插入文本框
        $(this).append(input);
        $('#tempId').focus();
        $('#tempId').blur(function () {
            //===不會自動轉換類型，==可以
            if ($(this).val() === '' ) {
                $(this).val(oldVal);
            }
            //拿到當前輸入框的id，判斷id為何。const是不變量
            const tempParentId =  $(this).parent().attr("id");
            updateStudentAjax({
                "id":id,
                "name":tempParentId === 'name' ? $(this).val() : name,
                "chineseScore": tempParentId === 'chineseScore' ? $(this).val() : chineseScore ,
                "englishScore": tempParentId === 'englishScore' ? $(this).val() : englishScore  ,
                "mathScore":tempParentId === 'mathScore' ? $(this).val() : mathScore
            })

            $(this).closest('td').text(oldVal);
        })

    })
});


function getList() {
    $.ajax({
        type: "GET",
        url: "/user/list",
        //contentType: "application/json;charset=utf-8",
        //dataType: "JSON",
        success: function (data) {
            //清空數據
            $("#tbody").html('');
            //追加數據
            for (var i = 0; i < data.length; i++) {
                $("#tbody").append("<tr>" +
                    "<th id='id'>" + data[i].id + "</th>" +
                    "<td id='name'>" + data[i].name + "</td>" +
                    "<td id='chineseScore'>" + data[i].chineseScore + "</td>" +
                    "<td id='mathScore'>" + data[i].mathScore + "</td>" +
                    "<td id='englishScore'>" + data[i].englishScore + "</td>" +
                    "<td><button class='update'>修改</button>" + "&nbsp" +
                    "<button class='delete'>删除</button></td>" +
                    "</tr>")
            }


    //修改用户
    $(".update").click(
        function () {
            // let id = $(this).parent().siblings("td").html()
            let id = $(this).parent().prev().prev().prev().prev().prev().html();
            updateStudent(id);
        })

    //删除用户
    $(".delete").click(
        function () {
            // let id = $(this).parent().siblings("td").html()
            let id = $(this).parent().prev().prev().prev().prev().prev().html();
            $.ajax({
                type: "DELETE",
                url: "/user/del/" + id,
                success: function () {
                    alert("删除成功");
                    location.reload();
                },
                error: function () {
                    alert("删除失敗");
                }
            });
        })
},
    error: function () {
        alert("查詢失敗");
    }
}

)
;
}
//修改用戶發送請求
function updateStudentAjax(params){
    $.ajax({
        url: '/user/update/' + params.id,
        type: "PUT",
        contentType: "application/json", //請求類型，不設置默認是application/x-www-form-urlencode
        dataType: "JSON", //預期服務器返回的數據類型
        data: JSON.stringify({
            "name": params.name,
            "chineseScore": params.chineseScore,
            "englishScore": params.englishScore,
            "mathScore": params.mathScore
        }),
        success: function (data) {
            // alert(data.msg);
            location.reload();
        }
    });

}
//修改用户時回顯數據
function updateStudent(id) {
    $("#hid").text("修改用户");//把用户列表改為改为修改用户
    $("#head").hide();//隐藏
    $("#inputId").hide();//隐藏
    $.ajax({
        type: "GET",
        url: '/user/getById/' + id,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) { //這邊返回一個student
            //追加數據
            $("#show").append(
                "id：<input type='text' id='id' name='id' value='" + data.id + "' disabled><br>" +
                "姓名：<input type='text' id='name' name='name' value='" + data.name + "'><br>" +
                "國文成績：<input type='text' id='sex' name='chineseScore' value='" + data.chineseScore + "'><br>" +
                "數學成績：<input type='text' id='age' name='mathScore' value='" + data.mathScore + "'><br>" +
                "英文成績：<input type='text' id='address' name='englishScore' value='" + data.englishScore + "'><br>" +
                "<button class='update'>確定修改</button>");

            $(".update").click(function () {
                var name = $("input[name='name']").val();
                var chineseScore = $("input[name='chineseScore']").val();
                var englishScore = $("input[name='englishScore']").val();
                var mathScore = $("input[name='mathScore']").val();
                updateStudentAjax({
                    "id":id,
                    "name":name,
                    "chineseScore":chineseScore,
                    "englishScore":englishScore,
                    "mathScore":mathScore
                })
                // $.ajax({
                //     url: '/user/update/' + id,
                //     type: "PUT",
                //     contentType: "application/json", //請求類型，不設置默認是application/x-www-form-urlencode
                //     dataType: "JSON", //預期服務器返回的數據類型
                //     data: JSON.stringify({
                //         "name": name,
                //         "chineseScore": chineseScore,
                //         "englishScore": englishScore,
                //         "mathScore": mathScore
                //     }),
                //     success: function (data) {
                //         alert(data.msg);
                //         location.reload();
                //     }
                // });
            })
        }
    })
}


//添加用户顯示輸入框
function insertStudent() {

    $("#hid").text("新增用户");//把用户列表改為修改用户
    $("#head").hide();//隐藏
    $("#inputId").hide();//隐藏
    $.ajax({
        success: function () {
            //追加數據
            $("#show").append(
                "姓名：<input type='text' id='name' name='name' value=''></br>" +
                "語文成績：<input type='chineseScore' id='chineseScore' name='chineseScore' value=''></br>" +
                "英語成績：<input type='englishScore' id='englishScore' name='englishScore' value=''></br>" +
                "數學成績：<input type='mathScore' id='mathScore' name='mathScore' value=''></br>" +
                "<button  class='insert'>確認添加</button>");

            $(".insert").click(
                //添加用户
                function insertStudent() {
                    //取得輸入的值
                    var name = $("input[name='name']").val();
                    var chineseScore = $("input[name='chineseScore']").val();
                    var englishScore = $("input[name='englishScore']").val();
                    var mathScore = $("input[name='mathScore']").val();
                    $.ajax({
                        url: '/user/add',
                        type: "POST",
                        contentType: "application/json",
                        dataType: "JSON",
                        data: JSON.stringify({
                            "name": name,
                            "chineseScore": chineseScore,
                            "englishScore": englishScore,
                            "mathScore": mathScore
                        }),
                        success: function (data) {
                            alert(data.msg)
                            //瀏覽器刷新
                            location.reload();
                        }
                    });
                })
        },
        error: function () {
            window.alert("無法新增");
        }
    })
}

//事務測試
function addAndDel() {

    $("#hid").text("事務測試");//把用户列表改為修改用户
    $("#head").hide();//隐藏
    $("#inputId").hide();//隐藏
    $.ajax({
        success: function () {
            //追加數據
            $("#show").append(
                "要新增的學生信息</br>",
                "姓名：<input type='text' id='name' name='name' value=''></br>" +
                "語文成績：<input type='chineseScore' id='chineseScore' name='chineseScore' value=''></br>" +
                "英語成績：<input type='englishScore' id='englishScore' name='englishScore' value=''></br>" +
                "數學成績：<input type='mathScore' id='mathScore' name='mathScore' value=''></br>" +
                "</br>" +
                "要刪除的學生id</br>",
                "id：<input type='text' id='id' name='id' value=''></br>" +
                "<button class='addAndDel'>確認執行</button>");

            $(".addAndDel").click(
                //事務測試
                function addAndDel() {
                    //取得要新增學生的信息
                    var name = $("input[name='name']").val();
                    var chineseScore = $("input[name='chineseScore']").val();
                    var englishScore = $("input[name='englishScore']").val();
                    var mathScore = $("input[name='mathScore']").val();
                    //取得要刪除學生的id
                    var id = $("input[name='id']").val();
                    $.ajax({
                        url: '/user/addAndDel/' + id,
                        type: "DELETE",
                        dataType: "JSON",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "name": name,
                            "chineseScore": chineseScore,
                            "englishScore": englishScore,
                            "mathScore": mathScore,
                        }),
                        success: function (data) {
                            alert(data.msg)
                            //瀏覽器刷新
                            location.reload();
                        },
                        error: function () {
                            alert("事務執行失敗");
                            location.reload();
                        }
                    });

                })
        },
        error: function () {
            window.alert("無法新增");
        }
    })
}


//根据 name 模糊查詢
function getByStudentName() {
    var name = $("input[id='getByNameInput']").val();
    if (name === "") {
        getList();
    } else {
        $.ajax({
            type: "GET",
            url: '/user/getByName/' + name,
            contentType: "application/json;charset=utf-8",
            //dataType: 'json',
            success: function (data) {
                //清空數據
                $("#tbody").html('');
                //追加數據
                for (var i = 0; i < data.length; i++) {
                    $("#tbody").append("<tr>" +
                        "<td>" + data[i].id + "</td>" +
                        "<td>" + data[i].name + "</td>" +
                        "<td>" + data[i].chineseScore + "</td>" +
                        "<td>" + data[i].mathScore + "</td>" +
                        "<td>" + data[i].englishScore + "</td>" +
                        "<td><button class='update'>修改</button>" + "&nbsp" +
                        "<button class='delete'>删除</button></td>" +
                        "</tr>")
                }
                //修改用户
                $(".update").click(
                    function () {
                        let id = $(this).siblings().parent().siblings("td").html()
                        updateStudent(id);
                    })

                //删除用户
                $(".delete").click(
                    function () {
                        let id = $(this).siblings().parent().siblings("td").html()
                        $.ajax({
                            type: "DELETE",
                            url: "/user/del/" + id,
                            success: function () {
                                window.location.reload();
                                alert("删除成功");
                            },
                            error: function () {
                                alert("删除失敗");
                            }
                        });
                    })
            },
            error: function () {
                window.alert("查詢失敗");
            }
        });
    }
}




