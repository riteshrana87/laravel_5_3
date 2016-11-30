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
        <div class="row">
            <div class="col-lg-12">

            </div>
        </div>
    </div>
@stop

@section('footer')
    @include('includes.admin.adminfooter')
@stop
