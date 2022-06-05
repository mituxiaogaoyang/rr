<template>
  <div id="fileUpload">
        <div class="pTable">
            <div id="table" class="container_pTable"></div>
            <div id="table-lanthanoids" class="container_pTable"></div>
            <div id="table-actinoids" class="container_pTable"></div>
        </div>
        <div class="form_file">
            <div class="line">
                <div class="label">相关元素：</div>
                <div class="val elements"><el-tag v-for=" k in selectedElements" :key="k">{{k}}</el-tag></div>
            </div>
            <div class="line">
                <div class="label">文件价格：</div>
                <div class="val"><el-input v-model="price" placeholder="请输入价格"></el-input></div>
            </div>
            <div class="line">
                <div class="label">文件上传：</div>
                <div class="val">
                    <el-upload
                        class="upload_box"
                        :action="uploadSite"
                        :on-success="uploadSuccess"
                        :headers ="headers"
                        :data="{type:0}"
                        :limit="1"
                        :file-list ="files"
                        :show-file-list="true">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="line">
                <div class="label">文件预览图：</div>
                <div class="val">
                    <el-upload
                        class="upload_img"
                        :action="uploadSite"
                        :on-success="uploadSuccess2"
                        :headers ="headers"
                        :data="{type:1}"
                        :show-file-list="false">
                        <img v-if="previewPic" :src="previewPic" class="avatar">
                        <template v-else>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text"><em>点击上传</em></div>
                        </template>
                    </el-upload>
                </div>
            </div>
            <div class="line line_last"><el-button type="primary" @click="onSubmit">提交</el-button></div>
        </div>
  </div>
</template>

<script>
import $ from 'jquery';
import data from '../utils/periodicTable';
import {deal, select,removeSelectedClass} from '../utils/pTable';
import '../utils/pTable.css';
import { apiContextPath, addFile} from '@/apis/home';
const imgSite = apiContextPath + '/upload' ;

export default {
    name: 'fileUpload',
    data () {
        return {
            selectedElements:[],
            uploadSite: imgSite,
            headers:{
                'access-token':sessionStorage.getItem('access_token')
            },
            fileSourceName:'',
            previewPic:'',
            price: '',
            files:[]
        };
    },
    mounted () {
        deal(data);
        const _instance = this;
        $('body').on('click', '.element', function(e){
            var _this = $(this);
            select(_this,_instance.selectedElements)
        })
    },
    destroyed (){
        $('body').off('click');
    },
    methods: {
        uploadSuccess(res,file){
            console.log(file)
            this.fileSourceName = file.name;
            this.path =  file.response.data;
        },
        uploadSuccess2(res,file){
            this.previewPic =  file.response.data;
        },
        onSubmit(){
            const {fileSourceName, price,previewPic,  path, selectedElements} = this;
            if( price&&fileSourceName && previewPic && path && selectedElements.length){
                const elementCodes = selectedElements.join(',');
                addFile({fileSourceName,previewPic,price,path,elementCodes}).then(res =>{
                    this.$message.success('新添成功');
                    this.fileSourceName ='';
                    this.price ='';
                    this.selectedElements = [];
                    this.path ='';
                    this.files = [];
                    this.previewPic = '';
                    this.$emit('updateList');
                    removeSelectedClass();
                });
            }else{
                this.$message.warning('提交信息不完整')
            }
        }
    }

}
</script>

<style lang='less' scoped>
.pTable{
    float:left;
}
.form_file{
    padding:30px 0;
    width:400px;
    float: left;
    .line{
        margin: 12px 0;
        display: flex;

        .label{
            width:100px;
            text-align: right;
            line-height: 40px;
        }
        .val{
            width: 280px;
            .el-input {
                width: 100%;
            }
            .upload_img{
                width:180px;
                height:120px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                align-content: center;
                border:1px dotted #ccc;
            }
        }
        .elements{
            border-bottom: 1px dotted #ccc;
        }
        
    }
    .line_last{
        .el-button{
            margin: 20px 100px;
        }
    }

}
</style>