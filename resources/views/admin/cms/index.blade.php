@extends('layouts.admin')
@section('header')
    @include('includes.admin.adminheader')
@stop

@section('menu')
    @include('includes.admin.adminmenu')
@stop

@section('sidebar')
    @include('includes.admin.adminsidebar')
@stop

@section('content')

    <div id="page-wrapper">

        <div class="top-space"></div>
        <div class="row">

            <div class="col-lg-12">
                <h1 class="page-header">CMS Management</h1>

            </div>
        </div>

        <div class="col-lg-12">
            <div class="admin-options-landmark">
                Active <button class="btn btn-info btn-circle" type="button"><i class="fa fa-check"></i>
                </button>
                InActive <button class="btn btn-warning btn-circle" type="button"><i class="fa fa-check"></i>
                </button>
            </div>
        </div>
        <div class="top-space clearfix" ></div>
        <!-- /.col-lg-12 -->

        @if(Session::has('error'))
            <div class="alert alert-danger">
                <button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
                <strong>{!! Session::get('error')!!} </strong>
            </div>
        @endif

        @if(Session::has('success'))
            <div class="alert alert-success">
                <button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
                <strong>{!! Session::get('success')!!}</strong>
            </div>
        @endif


        <div class="top-space"></div>
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <i class="fa fa-files-o fa-fw"></i> CMS


                    <div class="pull-right">
                        <div class="btn-group">
                            {!! link_to('portaladmin/cms/create','Add New',array('class'=>'btn btn-primary btn-xs',
                            'style'=>'text-decoration:none;')) !!}
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table id="dataTables-example"
                               class="table table-striped table-bordered table-hover dataTable no-footer"
                               aria-describedby="dataTables-example_info" ajax_resource>
                            <thead>
                            <tr>
                                <th id="center_dsply">ID</th>
                                <th id="center_dsply">Title</th>
                                <th id="center_dsply">Active</th>
                                <th id="center_dsply">Date Created</th>
                                <th id="center_dsply">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            <?php $i = 0; ?>
                            @foreach($results as $result)
                                <tr class="@if($i%2==0) even gradeC @else odd gradeX @endif ">
                                    <td align='center'> {!! $result['cms_id'] !!}</td>
                                    <td align='center'> {!! ucfirst($result['page_title']) !!}</td>
                                    <td align='center'>
                                        @if($result['is_status']==0)
                                            <a href="{!! URL::action('Admin\CmsController@status',['cmsid' => $result->cms_id,'status' =>'1']) !!}">
                                                <button class="btn btn-warning btn-circle" type="button"><i class="fa fa-check"></i>
                                                </button>
                                            </a>
                                        @else
                                            <a href="{!! URL::action('Admin\CmsController@status',['cmsid' => $result->cms_id,'status' =>'0',]) !!} ">
                                                <button class="btn btn-info btn-circle" type="button"><i class="fa fa-check"></i>
                                                </button>
                                            </a>
                                        @endif
                                    </td>
                                    <td align='center'> {!! date("d F Y",strtotime($result->created_at)) !!}</td>
                                    <td align='center'>
                                        <a href=" {!! URL::to('portaladmin/cms/'.$result->cms_id .'/edit') !!}">
                                            <i class="fa fa-pencil-square-o fa-fw"></i>
                                        </a>&nbsp;&nbsp;
                                        <a href="{!! URL::action('Admin\CmsController@delete',['cmsid' => $result->cms_id]) !!}"
                                           onclick="return confirm('Are you sure you want to delete?');">
                                            <i class="fa fa-trash-o fa-fw"></i></a>
                                    </td>
                                    <?php $i++; ?>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                    <!-- /.table-responsive -->
                </div>
                <!-- /.panel-body -->
            </div>
        </div>
    </div>
    </div>

@stop
@section('footer')
    @include('includes.admin.adminfooter')
@stop
