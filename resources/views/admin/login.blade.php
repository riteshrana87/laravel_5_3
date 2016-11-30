@extends('layouts.admin')
@section('header')
    @include('includes.admin.adminheader')
@stop
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel" style='border:none;background: #F2DEDE;'>
                    @if ( $errors->count() > 0 )
                        <div style='background: #F2DEDE;'>
                            <div class="alert alert-danger" style='border:none;'>
                                <ul>
                                    @foreach( $errors->all() as $message )
                                        <li style='line-height: 30px;color:red;'>{!! $message !!}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    @endif
                    @if(Session::has('error'))
                        <div style='background: #DFF0D8'>
                            <div class="alert alert-danger" style='border:none;'>
                                <strong>{!! Session::get('error')!!}</strong>
                            </div>
                        </div>
                    @endif
                    @if(Session::has('success'))
                        <div style='background: #DFF0D8'>
                            <div class="alert alert-success" style='border:none;'>
                                <strong>{!! Session::get('success')!!}</strong>
                            </div>
                        </div>
                    @endif
                </div>
                <div class="login-panel panel panel-default" style='   margin-top: 10%;'>
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign In</h3>
                    </div>
                    <div class="panel-body">
                        {!! Form::open(array('method'
                        =>'post','name'=>'frmLogin','id'=>'frmLogin','url'=>'portaladmin/doLogin')) !!}
                        <fieldset>
                            <div class="form-group">
                                {!! Form::text('user_email', Input::old('email'), array('placeholder' => 'Please enter Email address','required'=>'required','id'=>'user_email','class'=>'form-control')) !!}

                            </div>

                            <div class="form-group">
                                {!! Form::password('password',array('placeholder' =>'Password','required'=>'required','id'=>'password','class'=>'form-control')) !!}
                            </div>
                            <div class="checkbox">
                                {{--<label>--}}
                                {{--{!! Form::checkbox('remember','1',array('class','btn btn-lg btn-success btn-block'))!!}--}}
                                {{--Remember Me--}}
                                {{--</label>--}}
                                {!! link_to('portaladmin/forgot-password','Forgot password
                                ?',array('style'=>'float:right;text-decoration:none;')) !!}
                            </div>
                            <!-- Change this to a button or input when using this as a form -->

                            {!! Form::submit('Login',array('class'=>'btn btn-lg btn-success btn-block')) !!}
                        </fieldset>
                        {!! Form::close() !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('footer')
    @include('includes.admin.adminfooter')
@stop