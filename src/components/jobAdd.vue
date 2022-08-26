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
            <!-- <div ref="editor1" class="editor_job"></div> -->
            <rich-text :content="jobDuty" ref="richText1"></rich-text>
        </div>
        <div class="line">
            任职要求：
            <!-- <div ref="editor2" class="editor_job"></div> -->
            <rich-text :content="jobRequire" ref="richText2"></rich-text>
        </div>
        <div class="btn_box">
            <el-button plain @click="cancelAdd">取消</el-button>
            <el-button type="primary" plain @click="submitJob">确认</el-button>
        </div>
    </div>
</template>

<script>
    import {apiContextPath, addJob, updateJob,getJobInfo} from '@/apis/home';
    const imgSite = apiContextPath + '/upload' ;
    import richText from '@/page/app/richTextSingle.vue';
    export default {
        components: {richText},
        data () {
            return {
                position: '',
                salary: '',
                num: '',
                jobDuty:'',
                jobRequire:''
            };
        },
        mounted () {
            //初始化富文本编辑器

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
                });
            }
        },
        methods: {
            cancelAdd(){
                this.$router.push('./job');
            },
            submitJob(){
                const position = this.position;
                const jobRequire = this.$refs.richText2.html;;
                const jobDuty = this.$refs.richText1.html;;
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