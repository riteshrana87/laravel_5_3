<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cms extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'cms';
    protected $primaryKey = 'cms_id';

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */

    /**
     * all Cms Record list resource.
     *
     * @return cms list
     * @date    03-10-2016
     * @author  Ritesh Rana
     */
    public static function CmsList() {
        $cms = Cms::where('is_delete', '=', '0')
            ->get();
        return $cms;
    }

    /**
     * selected Cms Record status update resource.
     *
     * @return cms list
     * @date    03-10-2016
     * @author  Ritesh Rana
     */
    public static function UpdateStatus($status, $cmsid) {
        Cms::where('cms_id', '=', $cmsid)->update(array('is_status' => $status));
    }

    /**
     * Cms Record by slug
     *
     * @return cms data
     * @date    03-10-2016
     * @author  Ritesh Rana
     */
    public static function GetCms($slug) {
        $cms = Cms::select('page_description')
            ->where('is_delete', '=', '0')
            ->where('page_title_slug', $slug)
            ->first();
        return $cms;
    }
}
