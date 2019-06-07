<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class indexController extends Controller
{
    public function index(){
        $data = [
            0 => [
                'id' => 1,
                'source' => 'images/picture1',
                'text' => 'this is picture one text',
            ],
            1 => [
                'id' => 2,
                'source' => 'images/picture2',
                'text' => 'this is picture two text',
            ]
        ];

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
