<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});
*/
Auth::routes();

Route::get('/home', 'HomeController@index');


Route::get('portaladmin', array('uses' => 'Admin\AdminController@showWelcome'));

Route::group(array('prefix' => 'portaladmin'), function () {

    //Admin Routes
    Route::get('welcome', array('as' => 'welcome', 'uses' => 'Admin\AdminController@showWelcome'));

    //Admin Login Routes
    Route::post('doLogin', 'Admin\AdminController@doLogin');

    Route::get('stats', 'Admin\AdminController@getStats');

    Route::resource('sales', 'Admin\AdminController@Sales');

    //Admin success Login
    Route::post('home', 'Admin\AdminController@home');

    //Admin forgotPassword view
    Route::get('forgot-password', 'Admin\AdminController@getForgetView');

    Route::post('forgot-password', 'Admin\AdminController@doForgot');

    Route::get('logout', array('as' => 'logout', 'uses' => 'Admin\AdminController@doLogout'));

    #change password via mail check is valid or not by admin side
    route::get('reset-password/{id}', 'Admin\AdminController@doResetPwdLinkCheck');

    #update new password via email link forgot pasword
    route::post('updatepassword', 'Admin\AdminController@doResetpassword');

    #cmslist
    Route::group(array('middleware' => 'authadmin'), function () {
        Route::resource('cms', 'Admin\CmsController');
    });

    #cms status update
    Route::get('cms/{cmsid}/{status}', array('middleware' => 'authadmin', 'uses' => 'Admin\CmsController@status'));
    #soft delete for cms
    Route::get('cms-delete/{cmsid}', array('middleware' => 'authadmin', 'uses' =>
        'Admin\CmsController@delete'));
});
