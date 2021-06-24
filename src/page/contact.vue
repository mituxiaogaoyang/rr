<template>
    <div class="contact">
        <el-form ref="form" :model="form" label-width="130px">
            <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="邮编">
                <el-input v-model="form.postalCode"></el-input>
            </el-form-item>
            <el-form-item label="qq">
                <el-input v-model="form.qq"></el-input>
            </el-form-item>
            <el-form-item label="公众号">
                <el-input v-model="form.officialAccount"></el-input>
            </el-form-item>
            <el-form-item label="公众号二维码">
                <el-upload
                    class="upload-demo2"
                    :action="uploadSite"
                    :on-success="uploadSuccess"
                    :headers ="headers"
                    :data="{type:1}"
                    :show-file-list="false">
                    <img v-if="form.officiaAccountQrCode" :src="form.officiaAccountQrCode" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {apiContextPath,getContact, setContact} from '@/apis/home';
    const imgSite = apiContextPath + '/upload' ;
    export default {
        data () {
            return {
               form:{
                    address: '',
                    phone: '',
                    email: '',
                    postalCode: '',
                    qq: '',
                    officialAccount: '',
                    officiaAccountQrCode: ''
               },
               uploadSite: imgSite,
               headers:{
                    access_token:sessionStorage.getItem('access_token')
                },

            };
        },
        mounted () {
            this.getData()
        },
        methods: {
            getData(){
                getContact().then(res =>{
                    for(let k in this.form){
                        this.form[k] = res.data[k];
                    }
                })
            },
            onSubmit(){
                setContact({...this.form}).then(res =>{
                    this.$message.success('编辑成功');
                    this.getData();
                })
            },
            uploadSuccess(res,file){
                this.form.officiaAccountQrCode =  file.response.data;
            },
            
        },
    };
</script>
<style lang="less">
    .contact{
        label{
            color: #999;
        }
        .upload-demo2{
            border: 1px dashed #d9d9d9;
            width:90px;
            height:90px;
            line-height:80px;
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
    }
</style>