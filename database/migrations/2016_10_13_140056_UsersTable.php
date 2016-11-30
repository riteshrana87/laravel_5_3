<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('UsersTable', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('user_firstname');
            $table->string('user_lastname');
            $table->string('username');
            $table->string('user_email')->unique();
            $table->string('password');
            $table->date('user_dob');
            $table->longText('user_address');
            $table->string('user_city');
            $table->string('user_state');
            $table->string('user_country');
            $table->string('user_zipcode');
            $table->string('user_mobile');
            $table->string('user_phone');
            $table->string('user_image');
            $table->string('user_type');
            $table->enum('is_delete', ['0', '1']);
            $table->enum('status', ['1', '0']);
            $table->rememberToken();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('UsersTable');
    }
}
