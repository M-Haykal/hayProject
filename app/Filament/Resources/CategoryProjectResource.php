<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryProjectResource\Pages;
use App\Filament\Resources\CategoryProjectResource\RelationManagers;
use App\Models\CategoryProject;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CategoryProjectResource extends Resource
{
    protected static ?string $model = CategoryProject::class;

    protected static ?string $navigationIcon = 'heroicon-s-rectangle-group';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                ->label('name category')
                ->required()
                ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->sortable()->searchable(),
                Tables\Columns\TextColumn::make('name')->sortable()->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCategoryProjects::route('/'),
            'create' => Pages\CreateCategoryProject::route('/create'),
            'edit' => Pages\EditCategoryProject::route('/{record}/edit'),
        ];
    }
}
