<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\UsersTable;
use Session;
use Validator;
use Input;
use Redirect;


class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function showWelcome()
    {
        $AdminId = Session::get('AdminId');
        if (isset($AdminId)) {
            return View('admin/home');
        } else {
            return View('admin/login');
        }
    }

    public function GetForgetView()
    {
        return View::make('admin/forgot');
    }

    /*
      |------------------------------------------------------------------------
      | Admin Controller @ doLogin
      |-------------------------------------------------------------------------
      | @desc   Function to login in to the admin panel
      | @author Ritesh Rana
      | @date	  29-09-2016
     */

    public function doLogin()
    {
        $rules = array(
            'user_email' => 'required|email', // make sure the email is an actual email
            'password' => 'required|alphaNum|min:3' // password can only be alphanumeric and has to be greater than 3 characters
        );
        // run the validation rules on the inputs from the form
        $validator = Validator::make(Input::all(), $rules);
        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            return Redirect::to('portaladmin')
                ->withErrors($validator) // send back all errors to the login form
                ->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
        } else {
            // create our user data for the authentication
            $userdata = array(
                'user_email' => Input::get('user_email'),
                'password' => Input::get('password')
            );
            // attempt to do the login
            $admindata = UsersTable::where('user_email', '=', Input::get('user_email'))
                ->where('password', '=', md5(Input::get('password')))
                ->where('user_type', '=', 'admin')
                ->where('is_delete', '=', '0')
                ->where('status', '=', '1')
                ->first();
            
            if (count($admindata) > 0) {
                #set session
                Session::put('AdminId', $admindata->user_id);
                Session::put('name', $admindata->username);
                // validation successful!
                //Session::flash('success', 'Authnticated successfully');
                return Redirect::to('portaladmin');
            } else {
                // validation not successful, send back to form
                Session::flash('error', 'Authntication failed. Email or Password is invalid');
                return Redirect::to('portaladmin');
            }
        }
    }

    /*
      |------------------------------------------------------------------------
      | Admin Controller @ doLogout
      |-------------------------------------------------------------------------
      | @desc   Function to logout from the admin panel
      | @author Ritesh Rana
      | @date	  29-09-2016
     */

    public function doLogout()
    {

        Session::flush();
        Session::flash('success', 'Logged out successfully from the application');
        return Redirect::to('portaladmin');
    }

    /*
      |------------------------------------------------------------------------
      | Admin Controller @ forgotPassword
      |-------------------------------------------------------------------------
      | @desc   Function to forgotpassword from the admin panel
      | @author Ritesh Rana
      | @date	  29-09-2016
     */

    public function doForgot()
    {
        if (Request::isMethod('post')) {
            if (Input::has('email')) {
                $email = Input::get('email');
                $result = UsersTable :: ForgetPasswordMail($email, $adminlink = true);
                if ($result) {
                    // forgot password link successfully sent via mail
                    Session::flash('success', 'change password link successfully sent via mail');
                    return Redirect::to('portaladmin');
                } else {
                    // forgot password link failed
                    Session::flash('error', 'your mail id is not matching with our database');
                    return View::make('admin/forgot');
                }
            }
        }
    }

    /**
     * change password via link controller with data.
     *
     * @return $confirmationid
     * @date   29-09-2016
     * @author Ritesh Rana
     */
    public function doResetPwdLinkCheck($id)
    {
        $result = Forgotlog::CheckId($id);
        if ($result) {
            return View::make('admin.user.resetpassword', array('id' => $id));
        } else {
            Session::flash('error', 'reset password link as expired');
            return Redirect::to('portaladmin');
        }
    }


    /**
     * Reset Password Admin forget time access this method via forget link
     * post
     * @return $id
     * @date   29-09-2016
     * @author Ritesh Rana
     */
    public function doResetpassword()
    {
        if (Request::isMethod('post')) {
            if (Input::has('password')) {
                $password = md5(Input::get('password'));
                $result = UsersTable :: UpdatePassword($password, Input::get('forgetId'));
                if ($result) {
                    Session::flash('success', 'password has been successfully changed');
                    return Redirect::to('portaladmin');
                } else {
                    // forgot password link failed
                    Session::flash('error', 'your reset password link is invalid');
                    return Redirect::to('portaladmin');
                }
            }
        }
    }

    /*
      |------------------------------------------------------------------------
      | Admin Controller @ changePassword
      |-------------------------------------------------------------------------
      | @desc   Function to changepassword from the admin panel
      | @author Ritesh Rana
      | @date	  29-09-2016
     */

    public function changePassword()
    {
        if (Request::isMethod('post')) {
            if (Input::has('password')) {
                $password = md5(Input::get('password'));
                $result = UsersTable :: UpdatePassword($password, '265facb991a318bcc498cdc3404ce112');
                if ($result) {
                    // successfully change password
                    Session::flash('success', 'change password successfully done');
                    return Redirect::to('portaladmin');
                } else {
                    // forgot password link failed
                    Session::flash('error', 'your changepassword link is expired');
                    return View::make('admin/forgot');
                }
            }
        }
    }
}
