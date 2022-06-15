<template>
    <div class="rich_box">
        <div ref="editor" class="editor_page"></div>
        <el-upload
            v-if = "includeFile"
            class="upload-demo2"
            :action="uploadSite"
            :headers ="headers"
            :data="{type:4}"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            multiple
            :file-list="fileList"
            >
            <el-button size="small" type="primary">附件上传</el-button>
        </el-upload>
    </div>
    
</template>

<script>
// 
    import Editor from 'wangeditor';
    import {apiContextPath} from '@/apis/home';
   const imgSite = apiContextPath + '/upload' ;
    export default {
        props:['content','includeFile'],
        data () {
            return {
                headers:{
                    'access-token':sessionStorage.getItem('access_token')
                },
                uploadSite: imgSite,
               fileList:[]
            };
        },
        watch:{
            content(){
                this.editorContent = this.content;
                this.editor.txt.html(this.content);
            }
        },
        mounted () {
            //初始化富文本编辑器
            const editor = new Editor(this.$refs.editor);
            editor.config.zIndex = 100;
            //判断页面 上传文件type
            let type ;
            const route = this.$route
            if(route.path.indexOf('appDetail')>-1){//公司产品
                type =3;
            }else if(route.path.indexOf('noticeDetail')>-1){
                if(route.query.type === 'meeting'){
                    type = 4
                }else if(route.query.type === 'train'){
                    type = 5;
                }else{
                    type = 6;
                }
            }
            editor.config.uploadImgServer = imgSite; // 上传图片到服务器
            editor.config.uploadImgHeaders  = {
                'access-token': sessionStorage.getItem('access_token')
            };
            editor.config.uploadImgParams = {
                type: type,
            }
            editor.config.uploadFileName = 'file';
            editor.config.onchange = (html) => {
                this.editorContent = html;
            };
            editor.config.customAlert =  (info) => {
                this.$message.info(info);
            };
            editor.config.uploadImgHooks = {
                before:function (xhr, editor, files) {
   
                },
                success: function (xhr, editor, result) {
                    console.log('upload image success');
                },
                fail: function (xhr, editor, result) {
                    console.log(result);
                },
                error:function (xhr, editor) {
                    
                },
                customInsert: function (insertImg, result, editor) {
                    const url = result.data ;
                    insertImg(url);
                }
            };
            editor.create();
            this.editor = editor;
            this.editorContent = this.content;
            editor.txt.html(this.content);
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.fileList = fileList;
            },
            handleSuccess(res,file, fileList) {
                //console.log(res,file, fileList);
                this.fileList.push({name:file.name,url:res.data});
            },
            
        },
    };
</script>

<style lang='less' scoped>
.newsAdd{
    .title{
        margin:24px 0;
        font-weight: bold;
    }
    .line{
        margin-top:20px;
        .word_desc{
            position: relative;
            top:-20px;
        }
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
.upload-demo2{
    margin:8px 0 20px;
    width:360px;
    // .el-upload-list{
    //     display: inline-block;
    //     vertical-align: middle;
    //     margin-left: 20px;
    //     height:36px;
    // }
}
</style>