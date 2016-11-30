<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersTable extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'UsersTable';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('password', 'remember_token');

    /*
      |------------------------------------------------------------------------
      | Admin User Related  @ userlist
      |-------------------------------------------------------------------------
      | @desc   Function to user all list from the admin side
     */

    public static function UserList() {
        $users = UsersTable::where('is_delete', '=', 0)
            ->where('user_type', '!=', 'admin')
            ->get();
        return $users;
    }

    /**
     * get latest user list for community page display
     *
     * @return  all latest user
     */
    public static function LatestUserList($orderby) {
        $users = UsersTable::where('is_delete', '=', 0)
            ->where('status', '=', 1)
            ->where('user_type', '!=', 'admin')
            ->where('is_public', '=', true)
            ->orderBy($orderby, 'desc')
            ->take(20)
            ->get(array('id', 'username', 'user_image', 'user_winepost_count', 'user_tasting_note_count'));
        return $users;
    }

    /**
     * get alla ctive users count
     *
     * @return  all user count
     */
    public static function ActiveUsersCount() {
        $users = UsersTable::where('is_delete', '=', 0)
            ->where('status', '=', 1)
            ->where('user_type', '!=', 'admin')
            ->count();
        return $users;
    }

    /*
      |------------------------------------------------------------------------
      | Admin Related Forget Password @ forgotPassword
      |-------------------------------------------------------------------------
      | @desc   Function to forgotpassword from the admin side
     */

    public static function ForgetPasswordMail($email, $adminlink = null) {
        #user Mail Check is true or not
        $users = UsersTable::where('user_email', '=', $email)->where('status', '=', '1')->where('is_delete', '=', '0')->first();
        if ($users) {
            #generate unique id
            $randomId = md5(microtime() . rand() . strtotime(date('Y-m-d H:i:s A')));
            #forget password log check
            $usersForgetLog = Forgotlog :: LogCheck($email);
            if ($usersForgetLog) {
                #delete old log forget password
                $deleteForgetLog = Forgotlog ::DeleteLog($email);
            }
            #insert New log for forgot password
            $forgot = new Forgotlog;
            $forgot->email = $email;
            $forgot->forget_id = $randomId;
            $forgot->created_at = date('Y-m-d h:i:s');
            $forgot->updated_at = date('Y-m-d h:i:s');
            $forgot->save();

            #send mail function call here
            $username = ucfirst($users->user_firstname) . " " . ucfirst($users->user_lastname);
            $email_data = array(
                'recipient' => $email,
                'subject' => 'Change Password Email Link'
            );
            if (isset($adminlink)) {
                $link = Config::get('app.url') . "portaladmin/reset-password/" . $randomId;
            } else {
                $link = Config::get('app.url') . "reset-password/" . $randomId;
            }

            // get email Template
            $mailTemplate = Emailtemplate::where('status', '=', true)->where('is_delete', '=', false)->where('title', '=', 'forgotpassword')->first();
            if ($mailTemplate) {
                $htmlContent = $mailTemplate;
            } else {
                $htmlContent = null;
            }
            $view_data = array(
                'link' => $link,
                'name' => $username,
                'html' => $htmlContent
            );
            Mail::send('frontend.mail.forgotpassword', $view_data, function($message) use ($email_data) {
                $message->to($email_data['recipient'])
                    ->subject($email_data['subject']);
            });
            #mail function here
            return true;
        } else {
            return false;
        }
    }

    /**
     * Send details of import file error for users
     *
     * @return filename
     */
    public static function ImportFileEroorsSend($filename) {
        #send mail function call here
        $users = UsersTable::where('is_delete', '=', false)->where('status', '=', true)->where('user_type', '=', 'admin')->first();
        $username = ucfirst($users->user_firstname) . " " . ucfirst($users->user_lastname);
        $importFile = storage_path() . "/excel/exports/" . $filename . ".xls";
        $email_data = array(
            'recipient' => $users->user_email,
            'subject' => 'Import Files Data not Proper',
            'filenpath' => $importFile
        );
        $link = Config::get('app.url') . "portaladmin/getimportfile/" . $filename;
        $view_data = array(
            'link' => $link,
            'name' => $username
        );
        Mail::send('frontend.mail.importfiles', $view_data, function($message) use ($email_data) {
            $message->to($email_data['recipient'])
                ->subject($email_data['subject']);
            //         ->attach($email_data['filenpath']);
        });
        #mail sends complete
    }

    /*
      |------------------------------------------------------------------------
      | Admin Related change Password @ UpdatePassword
      |-------------------------------------------------------------------------
      | @desc   Function to changepassword from the admin side
     */

    public static function UpdatePassword($password, $fid) {
        #get email on selected forget Id
        $forgetLog = Forgotlog ::CheckId($fid);
        if ($forgetLog) {
            $usermail = $forgetLog->email;
            #user Mail Check is true or not
            $users = UsersTable::where('user_email', '=', $usermail)->update(array('password' => $password));
            #delete forgot password log
            $deleteForgetLog = Forgotlog ::DeleteLog($usermail);
            return true;
        } else {
            return false;
        }
    }

    /*
      |------------------------------------------------------------------------
      | User Related change status mode @ UpdateStatus
      |-------------------------------------------------------------------------
      | @desc   Function to update the status from user side
     */

    public static function UpdateStatus($status, $uid) {
        UsersTable::where('id', '=', $uid)->update(array('status' => $status));
    }

    /*
      |------------------------------------------------------------------------
      | User Related change delete mode @ userdelete
      |-------------------------------------------------------------------------
      | @desc   Function to userdelete from the user side
     */

    public static function UserDelete($id) {
        UsersTable::where('id', '=', $id)->delete();
    }

    /*
      |------------------------------------------------------------------------
      | User Related change for edit profile
      |-------------------------------------------------------------------------
      | @desc   Function to edit from the user side
     */

    public static function UserEdit($id) {
        return UsersTable::where('is_delete', '=', 0)
            ->where('user_type', '!=', 'admin')
            ->where('id', '=', $id)
            ->first();
    }

    /*
      |------------------------------------------------------------------------
      | User Insert
      |-------------------------------------------------------------------------
      | @desc   Function to user data Insert in user table
     */

    public static function Insert() {
        if (Input::has('is_news_letter')) {
            $news_letter = 1;
        } else {
            $news_letter = 0;
        }

        #image upload
        if (Input::hasFile('user_image')) {
            $extension = Input::file('user_image')->getClientOriginalExtension();
            if ($extension == 'jpg' || $extension == 'jpeg' || $extension == 'png' || $extension == 'gif') {
                #$file = Input::file('product_image')->getRealPath();
                $destinationPath = 'assets/images/user/'; // Relative to the root
                $imageName = time() . str_replace(" ", "_", Input::file('user_image')->getClientOriginalName());
                #upload image
                Input::file('user_image')->move($destinationPath, $imageName);
            }
        } else {
            $imageName = null;
        }
        #new user insert to DB
        $user = new UsersTable;
        $user->user_firstname = Input::get('user_firstname');
        $user->user_lastname = Input::get('user_lastname');
        $user->user_email = Input::get('user_email');
        $user->username = Input::get('username');
        $user->password = Hash::make(Input::get('password'));
        $user->user_dob = date('Y-m-d', strtotime(Input::get('user_dob')));
        $user->user_address = Input::get('user_address');
        $user->user_city = Input::get('user_city');
        $user->user_state = Input::get('user_state');
        $user->user_image = $imageName;
        $user->user_country = Input::get('user_country');
        $user->user_zipcode = Input::get('user_zipcode');
        $user->user_mobile = Input::get('user_mobile');
        $user->user_phone = Input::get('user_phone');
        $user->user_type = Input::get('user_type');
        $user->is_news_letter = $news_letter;
        $user->created_at = date('Y-m-d h:i:s');
        $user->updated_at = date('Y-m-d h:i:s');
        $user->save();
    }

    public static function UpdateUser($id) {

        if (Input::has('is_news_letter')) {
            $news_letter = 1;
        } else {
            $news_letter = 0;
        }

        #image upload
        if (Input::hasFile('user_image')) {
            $extension = Input::file('user_image')->getClientOriginalExtension();
            if ($extension == 'jpg' || $extension == 'jpeg' || $extension == 'png' || $extension == 'gif') {
                #$file = Input::file('product_image')->getRealPath();
                $destinationPath = 'assets/images/user/'; // Relative to the root
                $imageName = time() . str_replace(" ", "_", Input::file('user_image')->getClientOriginalName());
                #upload image
                Input::file('user_image')->move($destinationPath, $imageName);
            }
        } else {
            $imageName = Input::get('hiddenimage');
        }
        #New user Register
        $user = UsersTable::find($id);
        $user->user_firstname = Input::get('user_firstname');
        $user->user_lastname = Input::get('user_lastname');
        $user->user_email = Input::get('user_email');
        $user->username = Input::get('username');
        $user->user_dob = date('Y-m-d', strtotime(Input::get('user_dob')));
        $user->user_address = Input::get('user_address');
        $user->user_city = Input::get('user_city');
        $user->user_image = $imageName;
        $user->user_state = Input::get('user_state');
        $user->user_country = Input::get('user_country');
        $user->user_zipcode = Input::get('user_zipcode');
        $user->user_mobile = Input::get('user_mobile');
        $user->user_phone = Input::get('user_phone');
        $user->user_type = Input::get('user_type');
        $user->is_news_letter = $news_letter;
        $user->created_at = date('Y-m-d h:i:s');
        $user->updated_at = date('Y-m-d h:i:s');
        $user->save();
    }

    /**
     * user register confirmation update function.
     *
     * @return user registration
     * @author Ritesh Rana
     */
    public static function RegistrationCheck($confid) {
        $users = UsersTable::where('is_delete', '=', 0)
            ->where('user_type', '!=', 'admin')
            ->where('registration_token', '=', $confid)
            ->where('status', '=', 0)
            ->first();
        if (count($users) > 0) {
            $user = UsersTable::find($users->id);
            $user->status = 1;
            $user->registration_token = '';
            $user->updated_at = date('Y-m-d h:i:s');
            $user->save();
            return true;
        } else {
            return false;
        }
    }

    /**
     * tasting notes join query function.
     *
     * @return tasting notes list
     * @author Ritesh Rana
     */
    public static function emailCheck($email) {
        $users = UsersTable::where('user_email', '=', $email)->where('status', '=', '1')->where('is_delete', '=', '0')->first();
        if ($users):
            return $users;
        else:
            return false;
        endif;
    }

    /**
     * check id valid or not.
     *
     * @return $id
     * @author Ritesh Rana
     */
    public static function CheckForgotId($id) {
        $objValid = UsersTable::where('forget_id = ?', $id)->first();
        if (count($objValid) > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function state() {
        return $this->belongsTo('State', 'user_state');
    }

    public function country() {
        return $this->belongsTo('Country', 'user_country');
    }

    public static function getUserInfo($user_id) {
        #user details get  user_email
        $userQuery = UsersTable::where('united_users.is_delete', '=', '0')
            ->leftjoin('united_countries', 'united_users.user_country', '=', 'united_countries.id')
            ->leftjoin('united_state', 'united_users.user_state', '=', 'united_state.id')
            ->where('united_users.status', '=', '1')
            ->where('united_users.user_type', '!=', 'admin')
            ->where('united_users.id', '=', $user_id)
            ->first(array(DB::Raw('united_users.id,united_users.username,united_users.user_firstname,united_users.user_lastname,united_users.user_email,united_users.user_mobile,united_users.user_phone,united_users.user_image,united_users.user_dob,united_users.user_address,united_users.user_zipcode,united_countries.name as countryName,united_state.name as stateName,united_users.user_type,united_users.is_public,united_users.biography,united_users.site_blog_url,united_users.is_whishlist_public,united_users.winewatcher_privacy')));
        return $userQuery;
    }

    /**
     * Function to update the user information
     *
     * @return status of the update function
     */
    public static function updateUserInfo($user_id) {

        $updatedata = array();
        if (Input::has('user_email_address')) {
            $updatedata['user_email'] = Input::get('user_email_address');
        }
        if (Input::has('new_password')) {
            $password = Hash::make(Input::get('new_password'));
            $updatedata['password'] = $password;
        }
        if (Input::has('profile_access')) {
            $updatedata['is_public'] = Input::get('profile_access');
        }
        if (Input::has('whishlist')) {
            $updatedata['is_whishlist_public'] = Input::get('whishlist');
        }
        if (Input::has('watcherpolicy')) {
            $updatedata['winewatcher_privacy'] = Input::get('watcherpolicy');
        }
        if (is_array($updatedata) and count($updatedata) > 0) {
            $affectedRows = UsersTable::where('id', '=', $user_id)->update($updatedata);
        } else {
            $affectedRows = 0;
        }
        return $affectedRows;
    }

    /**
     * selected user profile data get
     *
     * @return $id
     */
    public static function GetSelectedUserProfileData($id) {
        $users = UsersTable::where('is_delete', '=', 0)
            ->where('user_type', '!=', 'admin')
            ->where('status', '=', 1)
            ->where('id', '=', $id)
            ->first();
        return $users;
    }

    /*
      |------------------------------------------------------------------------
      | User Related change for view profile
      |-------------------------------------------------------------------------
     */

    public static function GetUserData($username, $public = null) {

        $userQuery = UsersTable::where('united_users.is_delete', '=', '0')
            ->leftjoin('united_countries', 'united_users.user_country', '=', 'united_countries.id')
            ->leftjoin('united_state', 'united_users.user_state', '=', 'united_state.id')
            ->where('united_users.status', '=', '1')
            ->where('united_users.user_type', '!=', 'admin')
            ->where('united_users.username', '=', trim($username));
        if (isset($public)) {
            $userQuery = $userQuery->where('is_public', '=', true);
        }
        $userQuery = $userQuery->first(array(DB::Raw('united_users.id,united_users.username,united_users.user_firstname,united_users.user_lastname,united_users.user_email,united_users.user_mobile,united_users.user_phone,united_users.user_image,united_users.user_dob,united_users.user_address,united_users.user_zipcode,united_countries.name as countryName,united_state.name as stateName,united_users.user_type,united_users.is_public,united_users.is_public,united_users.biography,united_users.site_blog_url,united_users.is_whishlist_public')));
        return $userQuery;
    }

    /**
     * shorturl generate via below function
     *
     * @author Ritesh Rana
     */
    public static function doGetShortUrl($url) {
        $shortUrl = Bitly::shorten($url)->getResponseData();
        if ($shortUrl['status_code'] == 200 && $shortUrl['status_txt'] == "OK") {
            return $generatedShortUrl = $shortUrl['data']['url'];
        } else {
            return $generatedShortUrl = Config::get('app.url');
        }
    }

    /**
     * function to provide the list of all  customer for export
     *
     * @return all customer data for export
     * @date    28-09-2016
     * @author Ritesh Rana
     */
    #export functionality
    public static function doExportCustomerList() {
        $query = UsersTable::where('united_users.is_delete', '=', '0')
            ->where('united_users.user_type', '!=', 'admin')
            ->join('united_countries', 'united_countries.id', '=', 'united_users.user_country')
            ->leftjoin('united_state', 'united_state.id', '=', 'united_users.user_state')
            ->leftjoin('united_sub_regions', 'united_sub_regions.id', '=', 'united_users.user_city')
            ->get(array(
                DB::Raw('united_users.*,united_countries.name as countryname,united_state.name as statename,united_sub_regions.sub_region_name as cityname')
            ));
        return $query;
    }
}
