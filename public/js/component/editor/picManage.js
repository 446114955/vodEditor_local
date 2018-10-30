class picManage extends main {
    constructor(data){
        super();
        this.imgX = data?data.imgX : 0;
        this.imgY = data?data.imgY:0;
        this.imgId= data?data.imgId:null;
        this.imgName = data?data.imgName:null;
        this.imgAlt = data?data.imgAlt:'图片';
        this.imgIndex = data?data.imgIndex:null;
        this.imgAlphe = data?data.imgAlphe:null;
        this.imgMiddlq = data?data.imgMiddlq:null;
        this.imgSrc = data?data.imgSrc:null;
        this.imgLSrc = data?data.imgLSrc:null;
        this.imgTopId = data?data.imgTopId:null;
        this.imgBottomId = data?data.imgBottomId:null;
        this.imgLeftpId = data?data.imgLeftpId:null;
        this.imgRightId = data?data.imgRightId:null;
        this.imgStage = data?data.imgStage:'视频按钮';
        this.btnVideo = data?data.btnVideo:null;
        this.btnMore = data?data.btnMore:null;
        this.imgFree = data?data.imgFree:'否';
    }
    pushNewPic(item){
        this.imgSrc = item.pathNow;
        this.imgName = item.picName;
        this.imgSrc = this.imgSrc.split('public')[1];
        this.imgSrc = `${this.imgSrc}\\${this.imgName}`;
        this.imgName = this.imgName.replace('.png','');
        this.imgName = this.imgName.replace('.jpg','');
        console.log(this.imgName)
        this.__proto__.__proto__.picArray.push(this);
    }
    pushOldPic(){
        this.__proto__.__proto__.picArray.push(this);
    }
}