<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Http\Response;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function download(string $hash)
    {
        $document = Document::findByHash($hash);

        return $document
            ? response()->download($document->absolute_path, $document->filename)
            : response('', Response::HTTP_FORBIDDEN);
    }
}
