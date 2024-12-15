<?php

namespace App\Filament\Resources\CategoryProjectResource\Pages;

use App\Filament\Resources\CategoryProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCategoryProjects extends ListRecords
{
    protected static string $resource = CategoryProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
