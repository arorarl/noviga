from app import db

class Chassis(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    modelNo = db.Column(db.String)
    
    maxSlots = db.Column(db.Integer)
    
    connectionType = db.Column(db.Enum('USB', ' Ethernet'))
    

    def to_dict(self):
        return dict(
            modelNo = self.modelNo,
            maxSlots = self.maxSlots,
            connectionType = self.connectionType,
            id = self.id
        )

    def __repr__(self):
        return '<Chassis %r>' % (self.id)
