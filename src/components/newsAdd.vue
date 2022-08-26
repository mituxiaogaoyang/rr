<template>
    <div class='newsAdd'>
        <!--  -->
        <div class="line">
            标题 ：
            <el-input v-model="title" autocomplete="off"></el-input>
        </div>
        <div class="line line_upload">
            封面图片 ：
            <el-upload
                class="upload-demo"
                :action="uploadSite"
                :on-success="uploadSuccess"
                :headers ="headers"
                :data="{type:2}"
                :show-file-list="false">
                <img v-if="coverUrl" :src="coverUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="line">
            <span class="word_desc">简介 ：</span>        
            <el-input  type="textarea" rows="3" placeholder="请输入内容" v-model="introduction"></el-input>
        </div>
        <div class="line">
            内容：
            <rich-text :content="editorContent" ref="richText"></rich-text>
        </div>
        <div class="btn_box">
            <el-button plain @click="cancelAdd">取消</el-button>
            <el-button type="primary" plain @click="submitNews(0)">确认</el-button>
            <!-- <el-button type="warning" plain @click="submitNews(1)">发布</el-button> -->
        </div>
    </div>
</template>

<script>
    import {apiContextPath, addNews, updateNews,getNewsInfo} from '@/apis/home';
    const imgSite = apiContextPath + '/upload' ;
    import richText from '@/page/app/richTextSingle.vue';
    export default {
        components: {richText},
        data () {
            return {
                title: '',
                introduction:'',
                uploadSite: imgSite,
                headers:{
                    'access-token':sessionStorage.getItem('access_token')
                },
                coverUrl:'',
                editorContent:''
            };
        },
        mounted () {
            //初始化富文本编辑器

            const id = this.$route.query.id;
            if(id){//修改
                this.idUpdate = id;
                getNewsInfo(id).then(res =>{
                    res = res.data;
                    this.title = res.title;
                    this.introduction = res.introduction;
                    this.editorContent =res.content;
                    this.coverUrl = res.guidePic;
                });
            }
        },
        methods: {
            cancelAdd(){
                this.$router.push('./news');
            },
            submitNews(){
                const title = this.title;
                const introduction = this.introduction;
                const content = this.$refs.richText.html;;;
                const url =this.coverUrl;
                if(title && introduction && content&& url){
                    if(this.idUpdate){ //update
                        const id = this.idUpdate;
                        updateNews({content,introduction,title,id,guidePic:url}).then(res =>{
                            this.$message.success('修改成功');
                            this.$router.push('./news');
                        });
                    }else{
                        addNews({content,introduction,title,guidePic:url}).then(res =>{
                            this.$message.success('新添成功');
                            this.$router.push('./news');
                        });
                    }
                    
                }else{
                    this.$message.error('请填完所有内容');
                }
            },
            previewNews(){
                console.log(this.editorContent);
                const title = this.title;
                const content =this.editorContent;
                if(title && content){
                    localStorage.setItem('newsTitle',title);
                    localStorage.setItem('newsContent',content);
                    let routeUrl = this.$router.resolve({
                        path: "/newsDetail/preview",
                    });
                    window.open(routeUrl .href, '_blank');
                }else{
                    this.$message.error('请填写标题和内容');
                }
                
            },
            uploadSuccess(res,file){
                this.coverUrl =  file.response.data;
            },
            // uploadBefore(){
            //     this.headers.Authorization = sessionStorage.getItem('accessToken');
            // }
        },
    };
</script>

<style lang='less' scoped>
.newsAdd{
    padding-bottom: 54px;
    .line2{
        display: flex;
        justify-content: space-between;
        margin-right:8%;
    }
    .line{
        margin-top:20px;
        .word_desc{
            position: relative;
            top:-20px;
        }
    }
    .btn_box{
        text-align: center;
        margin-top:30px;
    }
}
</style>
<style lang='less'>
.line2{
    .el-input{
        width:auto;
    }
}
.line{
    .el-input{
        width:80%;
    }
    .el-textarea{
        width:80%
    }
}
.editor_news{
    height:500px
}  
.editor_news .w-e-text-container{
    min-height: 420px;
}
.upload-demo{
    display: inline-block;
    border: 1px dashed #d9d9d9;
    width:160px;
    height:90px;
    line-height:90px;
    text-align: center;
    vertical-align: middle;
    overflow: hidden;
    img{
        vertical-align: middle;
        width: 100%;
        overflow: hidden;
    }
    .el-upload{
        width:100%;
        height:100%;
    }
}
</style>