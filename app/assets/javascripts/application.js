// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function startSettings() {
    //show clocks
    showClock();
    
    //datetimepicker
    $('input[id ^= "memo_due_date"]').datepicker({ dateFormat: 'yy-mm-dd' });
    var j = jQuery.noConflict();
    j('input[id ^= "memo_due_time"]').timepicker();
    
    //tooltips
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    })
}

function showClock() {
    var currentDate = new Date();
    var weekday = new Array(7);
    weekday[0] = "일";
    weekday[1] = "월";
    weekday[2] = "화";
    weekday[3] = "수";
    weekday[4] = "목";
    weekday[5] = "금";
    weekday[6] = "토";
    var day = weekday[currentDate.getDay()];
    var date = currentDate.getFullYear()+'년 '+(currentDate.getMonth()+1)+'월 '+currentDate.getDate()+"일 "+"("+day+") ";
    var divClock = document.getElementById("divClock");
     
    var msg = date+" / "+currentDate.getHours()+"시 "
    msg += currentDate.getMinutes()+"분 ";
    msg += currentDate.getSeconds()+"초";
     
    divClock.innerText = msg;
    setTimeout(showClock,1000);
}


function getLeftTime(id, due) {
    var countDownDate = new Date(due).getTime();

    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        if (isNaN(distance) && document.getElementById("due_"+id) != null) {
            document.getElementById("due_"+id).innerHTML = "마감 기한이 없습니다.";
            
        } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (document.getElementById("due_"+id) != null) {
                document.getElementById("due_"+id).innerHTML = days + "일 " + hours + "시간 "
                + minutes + "분 " + seconds + "초 남았습니다.";
            }
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("due_"+id).innerHTML = "마감기한이 지났습니다.";
                $(('#due_'+id)).parents('.card').toggleClass("border-danger");
            }
        }
    }, 1000);
}

$(document).ready(function(){
    $('input[id ^= "slider_checkbox"]').change(function(){
        if($(this).is(":checked")){
            var j = jQuery.noConflict();
            j('div[class ^="due-input-box"]').fadeIn( "slow" );
            $('input[id ^= "due_checked"]').val("true");
            $('input[id ^= "memo_due_date"]').prop('required',true);
            $('input[id ^= "memo_due_time"]').prop('required',true);
        }else{
            var j = jQuery.noConflict();
            j('div[class ^="due-input-box"]').fadeOut( "slow" );
            $('input[id ^= "due_checked"]').val("false");
            $('input[id ^= "memo_due_date"]').prop('required',false);
            $('input[id ^= "memo_due_time"]').prop('required',false);
        }
    });
});

function starSetting(id, priority){
    var selectedId = "#"+priority+"_"+id;
    $(selectedId).prop("checked", true);
}

function editSetting(id, priority) {
    //reset Due Settings
    var selectedId = "#slider_checkbox_"+id;
    if($(selectedId).is(":checked")){
        $('div[class ^="due-input-box"]').css("display", "block");
        $('input[id ^= "due_checked"]').val("true");
        $('input[id ^= "memo_due_date"]').prop('required',true);
        $('input[id ^= "memo_due_time"]').prop('required',true);
    }else{
        $('div[class ^="due-input-box"]').css("display", "none");
        $('input[id ^= "due_checked"]').val("false");
        $('input[id ^= "memo_due_date"]').prop('required',false);
        $('input[id ^= "memo_due_time"]').prop('required',false);
    }
    
    //priority setting
    starSetting(id, priority);
}

//complete AJAX
var i = 1;
function completeToggleAjax(div) {
    var id = div.children().first().val();
    var checked = div.children(':nth-child(2)').is(":checked");
    i++;
    if (i%2==0) {
        var j = jQuery.noConflict();
        j.ajax({
            url: "/complete",
            type: 'POST',
            data: {"id": id, "authenticity_token" : $("input[name=authenticity_token]").val()},
            error: function(request,status,error){
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            }).done(function(){
                if (div.parents('.card').hasClass("border-danger")) {
                    div.parents('.card').removeClass( "border-danger" );
                }
                div.parents('.card').toggleClass("border-success");
                div.parents('.card').children().toggleClass("complete-make-grey");
            });
    }
}

//sumbit validation check
function validationCheck(id) {
    var title = '#new_memo_title';
    var content  = '#new_memo_content';
    var slider = '#slider_checkbox';
    var date = '#memo_due_date';
    var time = '#memo_due_time';
    var error = '#error_message';
    if (id != 0) {
        title += '_' + id;
        content += '_' + id;
        slider += '_' + id;
        date += '_' + id;
        time += '_' + id;
        error += '_' + id;
    }
    
    if ($(title).val().length == 0 || $(content).val().length == 0) {
        $(error).html('제목/내용을 입력해주세요.');
        return false;
    }
    
    if ($(slider).is(':checked')) {
        if ($(date).val().length == 0 || $(time).val().length == 0){
            $(error).html('날짜/시간을 입력해주세요.');
            return false;
        }
    }
}
