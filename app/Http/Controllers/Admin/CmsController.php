<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Cms;
use Session;
use Validator;
use Input;
use Redirect;
use Str;

class CmsController extends Controller
{
    /**
     * Check user loggedin or not via construct
     *
     * @return  cms module
     * @date    03-10-2016
     * @author Ritesh Rana
     */
    public function __construct()
    {
        /* $Controllername = Route:: currentRouteAction();
         $jsfile = explode("@", $Controllername);
         View::share('jsfile', $jsfile[0]);
        */
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Cms :: CmsList();
        return View('admin.cms.index')->with('results', $result);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return View('admin.cms.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = array(
            'page_title' => 'required|unique:cms',
            'page_description' => 'required' // make sure the email is an actual email
        );
        $messages = array(
            'page_title' => 'please enter page title',
            'page_title.unique' => 'page title already exists in database',
            'page_description' => 'please enter page description'
        );
        #run the validation rules on the inputs from the form
        $validator = Validator::make(Input::all(), $rules, $messages);
        # if the validator fails, redirect back to the form

        if ($validator->fails()) {
            Session::flash('error', 'Please check below error');
            return Redirect::to('portaladmin/cms/create')
                ->withErrors($validator) // send back all errors to the login form
                ->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
        } else {
            //echo "test";exit;
            if ($request->isMethod('post')) {
                #cms Insert Function here
                if (Input::has('is_footer')) {
                    $is_footer = 1;
                } else {
                    $is_footer = 0;
                }
                #insert to DB
                $cms = new Cms;
                $cms->page_title = Input::get('page_title');
                $cms->page_title_slug = Str::slug(Input::get('page_title'));
                $cms->page_description = Input::get('page_description');
                //$cms->is_footer = $is_footer;
                $cms->is_status = Input::get('is_status');
                $cms->created_at = date('Y-m-d h:i:s');
                $cms->updated_at = date('Y-m-d h:i:s');
                $cms->save();
                #rediect with message
                Session::flash('success', 'Record has been inserted successfully');
                return Redirect::to('portaladmin/cms');
            }

        }
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
    public function edit($cms_id)
    {
        //echo $cms_id ;exit;
        //$result = Cms::find($cms_id);
        $result = Cms::where('cms_id', '=', $cms_id)->first();

        if($result)
            return View('admin.cms.edit')
                ->with('results', $result);
        return Redirect::to('portaladmin/cms');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $cms_id)
    {
        $rules = array(
            'page_title' => 'required|unique:cms',
            'page_description' => 'required' // make sure the email is an actual email
        );

        $messages = array(
            'page_title.required' => 'please enter page title',
            'page_title.unique' => 'page title already exists in database',
            'page_description' => 'please enter page description'
        );

        # run the validation rules on the inputs from the form
        $validator = Validator::make(Input::all(), $rules, $messages);

        #if the validator fails, redirect back to the form
        if ($validator->fails()) {
            Session::flash('error', 'Please check below error');
            return Redirect::to('portaladmin/cms/' . $cms_id . '/edit')
                ->withErrors($validator) // send back all errors to the login form
                ->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
        } else {
            if ($request->isMethod('PUT')) {
                #insert to DB -->update
                $cms = Cms::find($cms_id);
                $cms->page_title = Input::get('page_title');
                $cms->page_title_slug = Str::slug(Input::get('page_title'));
                $cms->page_description = Input::get('page_description');
                $cms->is_status = Input::get('is_status');
                $cms->save();
                #rediect with message
                Session::flash('success', 'Record has been updated successfully');
                return Redirect::to('portaladmin/cms');
            }
        }
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
    /**
     * Selected Cms Record delete resource.
     *
     * @return cms listpage
     * @date    03-10-2016
     * @author Ritesh Rana
     */
    public function delete($cms_id)
    {
        #soft delete
        //$cms = Cms::find($id);
        $cms = Cms::find($cms_id);
        $cms->is_delete = '1';
        $cms->is_status = '0';
        $cms->updated_at = date('Y-m-d h:i:s');
        $cms->save();
        #redirect
        Session::flash('success', 'Record has been deleted successfully');
        return Redirect::to('portaladmin/cms');
    }

    /**
     * Selected Cms Record status update resource.
     *
     *
     * @return cms listpage
     * @date    03-10-2016d
     * @author Ritesh Rana
     */
    public function status($cmsid,$status)
    {
        #status update
        Cms::UpdateStatus($status, $cmsid);
        #redirect
        Session::flash('success', 'Record has been updated successfully');
        return Redirect::to('portaladmin/cms');
    }


    /**
     * Selected Cms Record display in front end
     *
     *
     * @return cms slug
     * @date    03-10-2016
     * @author Ritesh Rana
     */
    public function GetCmsPages($slug)
    {
        #get cms pages records for frontend use
        $result = Cms::where('page_title_slug', '=', $slug)->where('is_delete', '=', false)->where('is_status', '=', true)->first();
        return View::make('frontend.cms.index', array('result' => $result));
    }

    /**
     * Selected Cms Record display in front end
     *
     *
     * @return cms slug
     * @date    03-10-2016
     * @author Ritesh Rana
     */
    public function GetContactPages()
    {
        #contact page records get
        return View::make('frontend.cms.contactus');
    }
}
