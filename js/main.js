// =====================
// 背景音乐
// =====================

let bgMusic = new Audio(
    "assets/audio/background.mp3"
);


bgMusic.loop = true;

bgMusic.volume = 0.3;


let musicOn = true;



// =====================
// 首页进入庭院
// =====================

function enterGarden(){

    window.location.href="garden.html";

}




// =====================
// 页面加载播放音乐
// =====================

window.onload = function(){


    if(
        window.location.pathname.includes("garden.html")
    ){

        bgMusic.play();

    }

};





// =====================
// 音乐开关
// =====================

function toggleMusic(){


    if(musicOn){


        bgMusic.pause();


        musicOn=false;


    }

    else{


        bgMusic.play();


        musicOn=true;


    }


}





// =====================
// 红叶回应
// =====================

async function waitAnswer(){



    const message =

    document.querySelector(".message");



    const button =

    document.querySelector(".wait-btn");



    const leaf =

    document.getElementById("leaf");





    // 隐藏提示文字


    message.style.opacity=0;


    button.style.display="none";





    // 等待


    await new Promise(resolve=>{


        setTimeout(resolve,1000);


    });






    // 红叶出现


    leaf.classList.add("leaf-fly");






    // 等待红叶飞完


    await new Promise(resolve=>{


        setTimeout(resolve,3000);


    });






    // 开启点击


    leaf.style.cursor="pointer";

    leaf.style.pointerEvents="auto";

    leaf.style.opacity="1";






    // 点击红叶


    leaf.addEventListener("click",()=>{



        console.log("红叶被点击");





        // BGM降低


        bgMusic.volume=0.05;





        // 红叶消失


        // 红叶消失

        leaf.style.animation="none";

        leaf.style.opacity="0";

        leaf.style.pointerEvents="none";






        // 信笺出现


        const letter =

        document.getElementById("letter");



        letter.classList.add("show");






        // 等待信笺展开


        setTimeout(()=>{


            showAnswer();



        },1000);





    },{once:true});



}









// =====================
// 显示答案
// =====================

async function showAnswer(){



    const answerBox =

    document.getElementById("answer");





    const response =

    await fetch("data/answers.json");





    const answers =

    await response.json();





    const randomIndex =

    Math.floor(Math.random()*answers.length);





    const answer =

    answers[randomIndex];






    answerBox.innerHTML="";






    // 逐字显示


    let index=0;



    const timer=setInterval(()=>{


        answerBox.innerHTML +=

        answer.text[index];



        index++;




        if(index>=answer.text.length){


            clearInterval(timer);


        }



    },120);









    // 播放角色语音


    const audio =

    new Audio(

    "assets/audio/"+answer.audio

    );





    // 声音最大


    audio.volume=1.0;





    audio.play();







    // 语音结束恢复音乐


    audio.onended=function(){



        bgMusic.volume=0.3;



    };




}