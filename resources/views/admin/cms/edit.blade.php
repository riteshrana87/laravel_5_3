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
        <div class="top-space1"></div>
        @if ( $errors->count() > 0 )
            <div class="panel-heading" style='background: #F2DEDE;'>
                <div class="alert alert-danger" style='border:none;'>
                    <ul>
                        @foreach( $errors->all() as $message )
                            <li style='line-height: 30px;color:red;'>{!! $message !!}</li>
                        @endforeach
                    </ul>

                </div>
            </div>
        @endif

        <div class="top-space"></div>
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <i class="fa fa-files-o fa-fw"></i> CMS
                        <div class="pull-right">
                            <div class="btn-group">

                                {!! link_to('portaladmin/cms','CMS List',array('class'=>'btn btn-primary btn-xs',
                                'style'=>'text-decoration:none;')) !!}

                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                {!! Form::model($results, array('route' => array('cms.update', $results->cms_id),'name'=>'cms','id'=>'cms', 'method' => 'PUT')) !!}


                                <div class="form-group">
                                    {!! Form::label('page_title ', 'Page Title *')!!}
                                    {!! Form::text('page_title',null, array('placeholder' => 'Page Title','required'=>'required','id'=>'page_title','class'=>'form-control')) !!}
                                    <div class="input-error"></div>
                                </div>

                                <div class="form-group">
                                    {!! Form::label('page_description', 'Description *')!!}
                                    {!! Form::textarea('page_description', null, array('id' =>
                                    'page_description','class'=>'ckeditor','rows'=> 10,'cols'=>35)) !!}

                                    <div class="input-error"></div>
                                </div>


                                <div class="form-group">
                                    {!! Form::label('is_status', 'Status')!!}
                                    {!! Form::select('is_status', array(
                                    '1' => 'Active',
                                    '0'=>'Inactive'),null,array('class'=>'form-control')) !!}
                                    <div class="input-error"></div>
                                </div>

                            <!--                            <div class="form-group">
                                {!! Form::label('footer_menu', 'Display In Footer')!!}
                            @if($results->is_footer=='1')
                                {!! Form::checkbox('is_footer', '1',true); !!}
                            @else
                                {!! Form::checkbox('is_footer', '1',false); !!}
                            @endif
                                    </div>-->

                                <div class="fltleft" style="margin-left: 20%;"></div>
                                <button class="btn btn-primary btn-lg" type="submit">Save</button>
                                <button class="btn btn-primary btn-lg" type="reset">Reset</button>
                                {!! link_to('portaladmin/cms','Cancel',array('class'=>'btn btn-primary btn-lg',
                                'style'=>'text-decoration:none;')) !!}

                                </form>
                            </div>
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

    <!-- Placed at the end of the document so the pages load faster -->
