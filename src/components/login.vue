<template>
    <div class='login_page'>
        <div class="container">
            <div class="title">锐睿科技后台管理系统</div>
            <div class="login_box">
                <div class="core">
                    <div class="word">登录</div>
                    <div class="form_box">
                        <el-input v-model="userName" placeholder="账号" class="input_login"></el-input>
                        <el-input v-model="userPassword" type="password"  class="input_login" placeholder="密码"></el-input>    
                        <el-button type="primary" @keyup.enter="loginIn"  round class="btn_login" @click="loginIn">登录</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {loginIn} from '@/apis/login';
    import {storeToken} from '@/apis/http';
    export default {
        data () {
            return {
                userName: '',
                userPassword: '',
            };
        },
        mounted () {
        },
        methods: {
            loginIn(){
                const pwd = this.userPassword;
                const userName = this.userName;
                loginIn(userName, pwd).then(res =>{
                    const data = res.data;
                    if(data.code === 0){
                        storeToken(data.data.token);
                        sessionStorage.setItem('userName',data.data.name);
                        sessionStorage.setItem('userLimit',data.data.roleId);
                        this.$router.push('./home');
                    }else{
                        this.$message.error(data.msg);
                    }
                    
                })
            }
        },
    };
</script>

<style lang='less' scoped>
.login_page{
    height:100vh;
    background: url(../assets/bg_login.png) no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .container{
        width:500px;
        margin: 210px auto 0;
        .title{
            color:#fff;
            font-size: 26px;
            font-weight: bold;
            text-align: center;
            margin:25px 0;
        }
        .login_box{
            background-color: #fff;
            border-radius: 8px;
            padding:20px 60px;
            margin:10px 0;
            .core{
                .word{
                    text-align: center;
                    font-size: 20px;
                    margin:12px 0;
                    letter-spacing: 8px;
                }
                .form_box{
                    .input_login{
                        margin:12px 0;
                        
                    }
                    .img_box{
                        position: relative;
                        .img{
                            position: absolute;
                            right:0;
                            width:160px;
                            bottom:7px;
                            height:40px;
                            cursor: pointer;
                            img{
                                width:100%;
                            }
                        }
                    }
                    .btn_login{
                        width:80%;
                        margin:36px auto;
                        display: block;
                    }
                }
            }
        }
    }
}
</style>
<style>
.el-input .el-input__inner{
    /* border-width: 0 0 1px 0; */
}
</style>