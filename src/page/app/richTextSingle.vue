<template>
    <div ref="editor" class="editor_page"></div>
</template>

<script>
    import Editor from 'wangeditor';
    import {apiContextPath} from '@/apis/home';
   const imgSite = apiContextPath + '/upload' ;
    export default {
        props:['content'],
        data () {
            return {
               
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
            editor.config.uploadImgServer = imgSite; // 上传图片到服务器
            editor.config.uploadImgHeaders  = {
                'access-token': sessionStorage.getItem('access_token')
            };
            editor.config.uploadImgParams = {
                type: 1,
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
.upload-demo{
    .el-upload-list{
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
        height:36px;
    }
}
</style>