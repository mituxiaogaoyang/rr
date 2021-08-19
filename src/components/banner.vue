<template>
    <div class='banner_page'>
        <div class="bar">
            <span class="label">公司简介：</span>
            <div class="value">
                <div class="answer" v-if="introType">{{intro}}</div>
                <el-input
                    v-else
                    type="textarea"
                    :rows="3"
                    placeholder="公司一句话介绍"
                    v-model="intro">
                </el-input>
            </div>
            <div class="btn_box">
                <el-button  v-if="introType" size="mini" @click="TurnEdit(1)" round>编辑</el-button>
                <el-button v-else size="mini" @click="submit1" round>确定</el-button>
            </div>
        </div>
        <div class="bar">
            <span class="label">产品和服务：</span>
            <div class="value">
                <div class="temp"  v-if="productType">
                    <div class="answer">{{product}}</div>
                    <div class="answer">{{service}}</div>
                </div>
                <div class="temp" v-else>
                    <el-input 
                        type="textarea"
                        :rows="3"
                        placeholder="请输入产品简介"
                        v-model="product">
                    </el-input>
                    <el-input 
                        type="textarea"
                        :rows="3"
                        placeholder="请输入服务简介"
                        v-model="service">
                    </el-input>
                </div>
                
            </div>
            <div class="btn_box">
                <el-button  v-if="productType" size="mini" @click="TurnEdit(2)" round>编辑</el-button>
                <el-button v-else size="mini" @click="submit2" round>确定</el-button>
            </div>
        </div>
        <div class="bar">
            <span class="label">图片上传：</span>
            <div class="value">
                <el-upload
                    class="upload-demo"
                    :action="uploadSite"
                    :on-success="uploadSuccess"
                    :headers ="headers"
                    :data="{type:1}"
                    :show-file-list="false">
                    <img v-if="bannerImg" :src="bannerImg" class="avatar">
                    <template v-else><i  class="el-icon-plus avatar-uploader-icon"></i><span class="tip_word">上传首页图</span></template>
                </el-upload>
                <div class="tips"><strong>首页banner图</strong><br/>(上传后请点击确定完成修改图片)</div>
            </div>
            <div class="btn_box">
                <el-button size="mini" @click="submitImg" round>确定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCompanyInfo, setCompanyWord, apiContextPath, setCompanyProduct, setCompanyService,setBannerImg} from '@/apis/home';
    const imgSite = apiContextPath + '/upload' ;
    export default {
        data () {
            return {
                intro: '',
                introType: 1, //0--确认  1--编辑
                productType: 1,
                product:'',
                service:'',
                uploadSite: imgSite,
                headers:{
                    'access-token':sessionStorage.getItem('access_token')
                },
                bannerImg: ''
            };
        },
        created(){    
            const isNews = Number(sessionStorage.getItem('userLimit'));
            if(isNews) this.$router.push('./news');
            else this.getData();
        },
        methods: {
            getData(){
                getCompanyInfo().then(res =>{
                    if(res.data){

                    
                        this.intro = res.data.introduce;
                        this.product = res.data.product;
                        this.service = res.data.service;
                        this.bannerImg = res.data.guidePic;
                    }
                })
            },
            TurnEdit(n){
                if(n===1) this.introType = 0;
                else if(n===2) this.productType = 0;
                
            },
            submit1(){
                setCompanyWord(this.intro).then(res =>{
                    this.introType = 1;
                    this.getData();
                    this.$message.success('修改成功')
                })
                
            },
            submit2(){
                setCompanyProduct(this.product).then(res =>{
                    setCompanyService(this.service).then(res2 =>{
                        this.productType = 1;
                        this.getData();
                        this.$message.success('修改成功')
                    })
                    
                })
            },
            uploadSuccess(res,file){
                this.bannerImg =  file.response.data;
            },
            submitImg(){
                if(this.bannerImg){
                    setBannerImg(this.bannerImg).then(res =>{
                        this.$message.success('图片修改成功');
                    })
                }
                
            }
            
        },
    };
</script>

<style lang='less' scoped>
.banner_page{
    .bar{
        margin-bottom:16px;
        padding:16px 0;
        position: relative;
        border-bottom:1px dashed #ccc;
        .value{
            margin-left:100px;
            .answer{
                border:1px solid #ccc;
                padding: 5px 15px;
                border-radius: 4px;
                min-height: 70px;
            }
            .temp>div:last-child{
                margin-top:10px;
            }
        }
        .label{
            font-weight: bold;
            position: absolute;
            top:20px;
            left:0;
        }
        .btn_box{
            position: absolute;
            top:50px;
            left:0;
        }
        .upload-demo{
            margin:5px 10px;
            border: 1px dashed #d9d9d9;
            width:250px;
            height:80px;
            line-height:90px;
            text-align: center;
            vertical-align: middle;

            img{
                vertical-align: middle;
                width: 100%;
                overflow: hidden;
            }
            .el-upload{
                width:100%;
                height:100%;
            }
            .tip_word{
                color:#999;
                font-size: 12px;
            }
        }
        .tips{
            color:#999;
            font-size: 12px;
        }
    }
}
</style>
