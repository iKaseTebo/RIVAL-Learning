<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class indexController extends Controller
{
    public function index(){
        return view('index');
    }

    public function test(){
        $data = [
            'first_name'=>'Kase',
            'last_name'=>'Tebo',
            'age'=>24
        ];
        return compact('data');
    }

}
