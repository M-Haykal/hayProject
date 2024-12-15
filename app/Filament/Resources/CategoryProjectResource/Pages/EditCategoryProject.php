<?php

namespace App\Filament\Resources\CategoryProjectResource\Pages;

use App\Filament\Resources\CategoryProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCategoryProject extends EditRecord
{
    protected static string $resource = CategoryProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
