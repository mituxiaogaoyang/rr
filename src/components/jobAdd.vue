<template>
    <div class='newsAdd'>
        <div class="line">
            职位名称 ：
            <el-input v-model="position" autocomplete="off"></el-input>
        </div>
        <div class="line">
            薪资标准 ：
            <el-input v-model="salary" autocomplete="off"></el-input>
        </div>
        <div class="line">
            招聘人数 ：
            <el-input v-model="num" autocomplete="off"></el-input>
        </div>
        <div class="line">
            职位简介：
            <div ref="editor1" class="editor_job"></div>
        </div>
        <div class="line">
            任职要求：
            <div ref="editor2" class="editor_job"></div>
        </div>
        <div class="btn_box">
            <el-button plain @click="cancelAdd">取消</el-button>
            <el-button type="primary" plain @click="submitJob">确认</el-button>
        </div>
    </div>
</template>

<script>
    import Editor from 'wangeditor';
    import {apiContextPath, addJob, updateJob,getJobInfo} from '@/apis/home';
    const imgSite = apiContextPath + '/upload' ;
    export default {
        data () {
            return {
                position: '',
                salary: '',
                num: ''
            };
        },
        mounted () {
            //初始化富文本编辑器
            const editor1 = new Editor(this.$refs.editor1);
            const editor2 = new Editor(this.$refs.editor2); 
            const editors = [editor1, editor2];
            editors.forEach((editor, i) =>{
                editors[i].config.zIndex = 100;
                editors[i].config.uploadImgServer = imgSite; // 上传图片到服务器
                editors[i].config.uploadImgHeaders  = {
                    'access_token': sessionStorage.getItem('access_token')
                };
                editors[i].config.uploadImgParams = {
                    type: 2,
                }
                editors[i].config.uploadFileName = 'file';
                editors[i].config.onchange = (html) => {
                    if(i ===0 ){
                        this.jobDuty = html;
                    }else{
                        this.jobRequire = html;
                    }

                };
                editors[i].config.customAlert =  (info) => {
                    this.$message.info(info);
                };
                editors[i].config.uploadImgHooks = {
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
                editors[i].create();
            })
            
            //
            const id = this.$route.query.id;
            if(id){//修改
                this.idUpdate = id;
                getJobInfo(id).then(res =>{
                    res = res.data;
                    this.position = res.position;
                    this.salary = res.salary;
                    this.jobRequire =res.jobRequire;
                    this.jobDuty = res.jobDuty;
                    this.num = res.num;
                    editor1.txt.html(res.jobDuty);
                    editor2.txt.html(res.jobRequire);
                });
            }
        },
        methods: {
            cancelAdd(){
                this.$router.push('./job');
            },
            submitJob(){
                const position = this.position;
                const jobRequire = this.jobRequire;
                const jobDuty = this.jobDuty;
                const salary = this.salary;
                const num = this.num;
                if( position && salary){
                    if(this.idUpdate){ //update
                        const id = this.idUpdate;
                        updateJob({salary,position,num, jobRequire, jobDuty,id}).then(res =>{
                            this.$message.success('修改成功');
                            this.$router.push('./job');
                        });
                    }else{
                        addJob({salary,position,num, jobRequire, jobDuty}).then(res =>{
                            this.$message.success('新添成功');
                            this.$router.push('./job');
                        });
                    }
                    
                }else{
                    this.$message.error('请填完所有内容');
                }
            }
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

</style>