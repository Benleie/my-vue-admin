<template>
  <div class="css-demo">
    <div class="test">
      <!-- <div class="channel">view details</div> -->
      <form action="/Login/Login" method="POST">
        <div style="text-align:center">
          <div class="login_table">
            <div class="login_row">
              <div class="login_cell">
                Username:
              </div>
              <div class="login_cell">
                <input class="form-control" name="username">
              </div>
            </div>
            <div class="login_row">
              <div class="login_cell">
                Password:
              </div>
              <div class="login_cell">
                <input class="form-control" name="password">
              </div>
            </div>
            <div class="login_row">
              <div class="login_cell" />
              <div class="login_cell">
                <input type="submit" value="Login" class="btn btn-primary">
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.test {
  width: 1000px;
  margin: 10px auto;
  .login_table {
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    border: 2px solid #46a7e0;
  }

  .login_row {
      display: flex;
      padding: 0.5em;
  }
  .login_row .login_cell:first-of-type {
    width: 90px;
    text-align: left;
    padding: 0 .5em;
  }
  .login_row .login_cell:last-of-type {
      flex: 1;
  }
  input {
    width: 100%;
  }
}
</style>
