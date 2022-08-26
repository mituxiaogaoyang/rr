<template>
    <div class="rich_box">
        <div style="border: 1px solid #ccc; margin-top: 10px;">
            <!-- 工具栏 -->
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
            />
            <!-- 编辑器 -->
            <Editor
                style="height: 360px; overflow-y: hidden;"
                :defaultConfig="editorConfig"
                v-model="html"
                
                @onCreated="onCreated"
            />
        </div>
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
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import {apiContextPath} from '@/apis/home';
   const imgSite = apiContextPath + '/upload' ;
    export default {
        components: { Editor, Toolbar },
        props:['content','includeFile','files'],
        data () {
            return {
                headers:{
                    'access-token':sessionStorage.getItem('access_token')
                },
                uploadSite: imgSite,
                fileList:[],
                editor: null,
                html: '',
                toolbarConfig: {
                    // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                    // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                },
                editorConfig: {
                    placeholder: '请输入内容...',
                    // autoFocus: false,
                    customAlert: (info) =>{
                        this.$message.info(info);
                    },
                    // 所有的菜单配置，都要在 MENU_CONF 属性下
                    MENU_CONF: {
                        uploadImage:{
                            server: imgSite,
                            fieldName: 'file',
                            meta: {
                                type: 1,
                            },
                            headers: {
                                'access-token': sessionStorage.getItem('access_token')
                            },
                            customInsert(res, insertFn){
                                const url = res.data;
                                insertFn(url, '', '')
                            }
                        },
                        uploadVideo:{
                            server: imgSite,
                            fieldName: 'file',
                            meta: {
                                type: 1,
                            },
                            headers: {
                                'access-token': sessionStorage.getItem('access_token')
                            },
                            customInsert(res, insertFn){
                                const url = res.data;
                                insertFn(url, '')
                            }
                        }
                    }
                }
            };
        },
        watch:{
            content(){
                this.html = this.content;
                let fileList = this.files;
                if(fileList && fileList.length){
                    fileList = fileList.map(item => {item.url = item.path;return item});
                    this.fileList = fileList;
                }
            }
        },
        mounted () {
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
            }else if(route.path.indexOf('addNews')>-1){
                type = 2;
            }else{
                type = 1;
            }
            this.editorConfig.MENU_CONF.uploadImage.meta.type =type;
            this.editorConfig.MENU_CONF.uploadVideo.meta.type =type;

        },
        methods: {
            onCreated(editor) {
                this.editor = Object.seal(editor) 
            },
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