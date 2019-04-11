<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Document extends Model
{
    protected $fillable = ['hash', 'filename', 'path', 'thumbnail'];

    public static function deleteByHash(string $hash): bool
    {
        $document = self::findByHash($hash);

        if ($document) {
            return (bool)$document->delete();
        }

        return true;
    }

    public static function findByHash(string $hash): ?self
    {
        $document = self::where('hash', $hash)->first();

        return $document ?: null;
    }

    public function getAbsolutePathAttribute(): string
    {
        return storage_path("app/{$this->path}");
    }

    public function delete()
    {
        Storage::delete($this->path);

        return parent::delete();
    }
}
