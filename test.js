function a(){
    var b= 0;
    var c =function(){
        console.log(b);
    }
}

a.d=function(){
    console.log(this.b);
}
